// shared.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  getStorage(key : string): boolean{
    return sessionStorage.getItem(key) != null;
  }
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      try {
        const parsedItem = JSON.parse(item);
        return parsedItem;
      } catch (error) {
        console.error(`Error parsing JSON for key ${key}:`, error);
        // Handle the error, e.g., return a default value or an empty object
      }
    }
    return null; // Return null if the item doesn't exist or cannot be parsed as JSON
  }
  
  
  
}
