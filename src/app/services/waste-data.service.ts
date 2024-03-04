// waste-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WasteDataService {
  private wasteData: any[] = [];

  constructor() { }

  getWasteData(): any[] {
    return this.wasteData;
  }

  addWasteData(data: any) {
    this.wasteData.push(data);
  }

  getWasteDetailsByDate(date: string): any {
    return this.wasteData.find(item => item.fecha === date);
  }
}
