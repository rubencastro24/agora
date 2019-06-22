import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CabecerasService {
  
  cabeceras : {};

  constructor() { }
  
  setHeaders(){
    this.cabeceras={
      headers: {
      "Content-Type": "application/JSON",
      "x-access-token": localStorage.getItem('token')
      }
    };
  }

  setHeadersPlain(){
    this.cabeceras={
      headers: {
      "x-access-token": localStorage.getItem('token')
      }
    };
  }
  
}
