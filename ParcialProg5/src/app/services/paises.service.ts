import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private Http: HttpClient) { 
   this.Http.get('https://restcountries.com')
  }
  getAllpaises(){
    this.Http.get('https://restcountries.com')
    
   }

}