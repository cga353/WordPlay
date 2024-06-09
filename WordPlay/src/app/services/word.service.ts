import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Attempt } from '../interfaces/attempt';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private wordsUrl = 'http://localhost:8080/api/words';
  private gessuesUrl = 'http://localhost:8080/api/games';
  private attemptsUrl = 'http://localhost:8080/api/attempts';
  private translationUrl = 'http://localhost:8080/api/translation';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addPalabra(palabra: string): Observable<number> {
    return this.http.post<number>(`${this.wordsUrl}`, { name: palabra }, this.httpOptions);
  }

  addPalabraAdivinada(game: any): Observable<any> {
    return this.http.post(`${this.gessuesUrl}`, game);
  }

  getTop5WordsByUserId(userId: number): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(`${this.attemptsUrl}/top5/user/${userId}`);
  }

  getWordsByIds(wordIds: number[]): Observable<any[]> {
    const requests = wordIds.map(id => this.http.get<any>(`${this.wordsUrl}/${id}`));
    return forkJoin(requests);
  }

  getGameStatistics(userId: number): Observable<any> {
    return this.http.get<any>(`${this.gessuesUrl}/statistics/${userId}`);
  }

  getSuccessfulGamesByUserId(userId: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.gessuesUrl}/successes/${userId}`);
  }

  getGamesByUserId(userId: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.gessuesUrl}/user/${userId}`);
  }

  getTranslation(word: string): Observable<{ name: string, text: string }[]> {
    return this.http.get<{ name: string, text: string }[]>(`${this.translationUrl}/${word}`);
  }

  getAttemptsByUserId(userId: number): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(`${this.attemptsUrl}/user/${userId}`);
  }

  getAttemptByUserIdAndWordId(userId: number, wordId: number): Observable<Attempt> {
    return this.http.get<Attempt>(`${this.attemptsUrl}/${userId}/${wordId}`);
  }

  createAttempt(attempt: Attempt): Observable<Attempt> {
    return this.http.post<Attempt>(`${this.attemptsUrl}`, attempt);
  }

  updateAttempt(userId: number, wordId: number, attempt: Attempt): Observable<Attempt> {
    return this.http.put<Attempt>(`${this.attemptsUrl}/${userId}/${wordId}`, attempt);
  }

}
