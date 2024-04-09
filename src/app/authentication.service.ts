import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, getDoc, getDocs, doc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { User } from './models/user.model';
import { UtilsService } from './services/utils.service';
import { uploadString, ref, getDownloadURL, deleteObject, getStorage } from 'firebase/storage';
import { orderBy } from 'firebase/firestore';


interface Waste {
  reciclables: number;
  biosanitarios: number;
  anatomopat: number;
  cortopunzantes: number;
  quimicos: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private wasteData: any;

  constructor(private ngFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private utilService: UtilsService) {}

  getAuth(){
    return getAuth();
  }

  async registerUser(user: User){
    return await this.ngFireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async updateUser(displayName: string){
    return await updateProfile(getAuth().currentUser, { displayName });
  }

  async loginUser(user: User){
    return await this.ngFireAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  async resetPassword(email: string){
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut() {
    await this.ngFireAuth.signOut();
    localStorage.removeItem('user');
    this.utilService.routerLink('/login');
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }

  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path ), data);
  }

  updateDocument(path: string, data: any){
    return updateDoc(doc(getFirestore(), path ), data);
  }

  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addRegister(path: string, data: any){
    return addDoc(collection(getFirestore(), path ), data);
  }



  async uploadImage(path: string, data_url: string){
    console.log("Path: ", path)
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    });
  }

  async getFilePath(url: string){
    const refImagen = ref(getStorage(), url).fullPath
    console.log("refImagen de la funcion getFilePath: ", refImagen)
    return refImagen;
  }



  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
    // Ordenar los documentos por fecha de manera descendente
    const sortedQuery = query(ref, collectionQuery ? collectionQuery : orderBy('fecha', 'desc'));
    return collectionData(sortedQuery, {idField: 'id'});
  }

  async getWasteDetailsById(id: string): Promise<any> {
    const userId = this.getAuth().currentUser?.uid;
    if (userId) {
      const path = `users/${userId}/wastes`;
      const docSnapshot = await getDoc(doc(getFirestore(), `${path}/${id}`));
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        console.error('No se encontró ningún residuo con el ID especificado.');
        return null;
      }
    } else {
      console.error('Usuario no autenticado: No se pueden obtener los detalles del residuo.');
      return null;
    }
  }

  async getWasteDetailsByDate(date: string): Promise<any> {
    const userId = this.getAuth().currentUser?.uid;
    if (userId) {
      const path = `users/${userId}/wastes`;
      const querySnapshot = await getDocs(collection(getFirestore(), path));
      const matchingDoc = querySnapshot.docs.find(doc => doc.data()['fecha'] === date);
      if (matchingDoc) {
        return matchingDoc.data();
      } else {
        console.error('No se encontraron datos para la fecha especificada.');
        return null;
      }
    } else {
      console.error('Usuario no autenticado: No se pueden obtener los detalles del residuo.');
      return null;
    }
  }

  setWasteData(data: any) {
    this.wasteData = data;
  }

  getWasteData() {
    const userId = this.getAuth().currentUser?.uid;
    if (userId) {
      const path = `users/${userId}/wastes`;
      return this.getDocument(path);
    } else {
      console.error('Usuario no autenticado: No se pueden obtener los detalles del residuo.');
      return null;
    }
  }

  async getImage(registerId: string) {
    const userId = this.getAuth().currentUser?.uid;
    const path = `users/${userId}/wastes/${registerId}`;
    const docRef = doc(getFirestore(), path);
    const docSnapshot = await getDoc(docRef);
    const wasteData = docSnapshot.data();

    if (wasteData && wasteData['imagePath']) {
        const imagePath = wasteData['imagePath'];
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);
        return imageRef;
    } else {
        console.error('No se encontró la ruta de la imagen en los datos del residuo.');
        return null;
    }
}



  async deleteImage(imagePath: string) {
    try {
      console.log('Eliminando imagen:', imagePath); // Agrega un mensaje para verificar si se llama a este método
      const storage = getStorage();
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      console.log('Imagen eliminada correctamente del storage.');
      return true; // Indica que la eliminación fue exitosa
    } catch (error) {
      console.error('Error al eliminar la imagen del storage:', error);
      return false; // Indica que hubo un error al intentar eliminar la imagen
    }
  }





  async deleteWaste(registerId: string) {
    try {
      const userId = this.getAuth().currentUser?.uid;
      if (userId) {
        const path = `users/${userId}/wastes/${registerId}`;
        const docRef = doc(getFirestore(), path);
        const docSnapshot = await getDoc(docRef);
        const wasteData = docSnapshot.data();

        // Si hay una imagen asociada, eliminarla del storage
        if (wasteData && wasteData['imagePath']) {
          const imagePath = wasteData['imagePath'];
          await this.deleteImage(imagePath);
        }

        // Eliminar el documento del residuo
        await deleteDoc(docRef);
        console.log('Registro de residuo eliminado correctamente.');

      } else {
        console.error('Usuario no autenticado: No se puede eliminar el registro del residuo.');
      }
    } catch (error) {
      console.error('Error al eliminar el registro de residuo:', error);
    }
  }





  async getWasteTotalsByDateRange(user: User, initialDate: Date, finalDate: Date): Promise<any> {
    const userId = user.uid;
    if (userId) {
      const path = `users/${userId}/wastes`;
      const querySnapshot = await this.firestore.collection(path, ref =>
        ref.where('fecha', '>=', initialDate).where('fecha', '<=', finalDate)).get();
      let totals = {
        residuosOrdinariosNoAprovechables: 0,
        residuosOrdinariosAprovechables: 0,
        totalResiduosOrdinarios: 0,
        residuosReciclables: 0,
        residuosBiosanitarios: 0,
        residuosAnatomopatologicos: 0,
        residuosCortopunzantes: 0,
        residuosQuimicos: 0,
        totalResiduosPeligrosos: 0,
        totalResiduos: 0
      };

      console.log("")
      console.log("==============================")
      console.log("getWasteTotalsByDateRange()")

      console.log("")
      console.log(totals)

      return totals;
    } else {
      console.error('Usuario no autenticado: No se pueden obtener los totales de residuos.');
      return null;
    }


  }








}
