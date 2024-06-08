import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomWordService {
  private apiUrl = 'http://localhost:8080/api/words/random'; // URL del endpoint del backend

  constructor(private http: HttpClient) { }

  obtenerPalabraAdivinar(): Observable<string> {
    return this.http.get<string>(this.apiUrl);
  }
}