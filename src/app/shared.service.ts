// shared.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  getStorage(key : string): boolean{
    return sessionStorage.getItem(key) != null;
  }
}
