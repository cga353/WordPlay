import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}
  
  validateUser(userName: string, password: string): Observable<boolean> {
    // Construye los parámetros de la consulta
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password);

    // Realiza la solicitud GET con los parámetros de consulta
    return this.http.get<boolean>(`${this.backendUrl}/validate`, { params });
  }

  register(user: any): Observable<any> {
    return this.http.post(this.backendUrl, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.backendUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.backendUrl}/${id}`, user);
  }

}
