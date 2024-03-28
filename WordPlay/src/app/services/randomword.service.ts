import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomWordService {
  private apiUrl = 'https://random-word-api.herokuapp.com/word?lang=en&&length=5'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  obtenerPalabraAdivinar(): Observable<string> {
    return this.http.get<string>(this.apiUrl);
  }

}
