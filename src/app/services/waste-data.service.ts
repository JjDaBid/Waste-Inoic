import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WasteDataService {
  private wasteData: any;
  private _isEditing: boolean = false;

  constructor() { }

  // setWasteData(data: any, isEditing: boolean) {
  //   this.wasteData = { ...data }; // Copiar los datos para evitar referencias
  //   this._isEditing = isEditing;
  // }

  // getWasteData() {
  //   return { ...this.wasteData }; // Devolver una copia de los datos para evitar modificaciones inesperadas
  // }

  // isEditing() {
  //   return this._isEditing;
  // }
}
