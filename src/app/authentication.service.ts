import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, getDoc, getDocs, doc, addDoc, collection, collectionData, query, updateDoc } from '@angular/fire/firestore'
import { User } from './models/user.model';
import { UtilsService } from './services/utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage'

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
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    });
  }

  async getFilePath(url: string){
    return ref(getStorage(), url).fullPath;
  }


  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
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
}
