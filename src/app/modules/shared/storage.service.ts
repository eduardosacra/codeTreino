import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setidCliente(value: any) {
    localStorage.setItem('idCliente', value);
  }
  getIdCliente() {
    return localStorage.getItem('idCliente');
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
  checkToken(token: string) {
    return localStorage.getItem(token) ? true : false;
  }
}
