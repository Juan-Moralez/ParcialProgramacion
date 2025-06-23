import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private API_BASE_URL = 'https://restcountries.com/v3.1';

  constructor(private Http: HttpClient) { 
  }
  getAllpaises(): Observable<any[]>{
    const fields = 'name,capital,region,population,flags,ccn3';
    return this.Http.get<any[]>(`${this.API_BASE_URL}/all?fields=${fields}`)
   }

   getPaisesByName(name : String): Observable<any[]>{
    return this.Http.get<any[]>(`https://restcountries.com/v3.1/name/${name}`)
   }

   getPaisesByRegion(region: string): Observable<any[]> {
    return this.Http.get<any[]>(`https://restcountries.com/v3.1/region/${region}`);
  }

}