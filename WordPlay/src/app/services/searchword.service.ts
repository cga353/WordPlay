import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchwordService {

  private apiUrl = 'http://localhost:8080/api/words/definition'; // URL del endpoint del backend

  constructor(private http: HttpClient) { }

  verificarPalabra(word: string): Promise<any> {
    const url = `${this.apiUrl}/${word}`;
    return this.http.get(url).toPromise();
  }
}
