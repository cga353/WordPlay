import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchwordService {
  // private apiUrl = 'https://words-api5.p.rapidapi.com/api/v1/dict/search/';
  // private apiKey = environment.apiKey; // Accede a la clave de la API desde environment

  // constructor(private http: HttpClient) { }

  // verificarPalabra(word: string): Promise<any> {
  //   const url = `${this.apiUrl}${word}`;
  //   const options = {
  //     headers: {
  //       'X-RapidAPI-Key': this.apiKey,
  //       'X-RapidAPI-Host': 'words-api5.p.rapidapi.com'
  //     }
  //   };

  //   return this.http.get(url, options).toPromise();
  // }


  private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  constructor(private http: HttpClient) { }

  verificarPalabra(word: string): Promise<any> {
    const url = `${this.apiUrl}${word}`;
    return this.http.get(url).toPromise();
  }





}
