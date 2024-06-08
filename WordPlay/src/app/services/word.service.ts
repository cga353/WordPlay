import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Attempt } from '../interfaces/attempt';
import { Guess } from '../interfaces/guess';
import { Word } from '../interfaces/word';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private wordsUrl = 'http://localhost:8080/api/words';
  private gessuesUrl = 'http://localhost:8080/api/guesses';
  private attemptsUrl = 'http://localhost:8080/api/attempts';
  private translationUrl = 'http://localhost:8080/api/translation';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getWords(): Observable<Word[]> {
    return this.http.get<Word[]>(this.wordsUrl);
  }

  addPalabra(palabra: string): Observable<number> {
    return this.http.post<number>(`${this.wordsUrl}`, { name: palabra }, this.httpOptions);

  }

  addPalabraAdivinada(guess: any): Observable<any> {
    return this.http.post(`${this.gessuesUrl}`, guess);
  }

  getTop5WordsByUserId(userId: number): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(`${this.attemptsUrl}/top5/user/${userId}`);
  }

  getWordsByIds(wordIds: number[]): Observable<any[]> {
    const requests = wordIds.map(id => this.http.get<any>(`${this.wordsUrl}/${id}`));
    return forkJoin(requests);
  }

  getGuessStatistics(userId: number): Observable<any> {
    return this.http.get<any>(`${this.gessuesUrl}/statistics/${userId}`);
  }

  getSuccessfulGuessesByUserId(userId: number): Observable<Guess[]> {
    return this.http.get<Guess[]>(`${this.gessuesUrl}/successes/${userId}`);
  }

  getGuessesByUserId(userId: number): Observable<Guess[]> {
    console.log('Getting guesses by user id:', userId);
    return this.http.get<Guess[]>(`${this.gessuesUrl}/user/${userId}`);
  }

  getTranslation(word: string): Observable<{ name: string, text: string }[]> {
    return this.http.get<{ name: string, text: string }[]>(`${this.translationUrl}/${word}`);
  }

  getAllAttempts(): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(`${this.attemptsUrl}`);
  }

  getAttemptsByUserId(userId: number): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(`${this.attemptsUrl}/user/${userId}`);
  }

  getAttemptsByWordId(wordId: number): Observable<Attempt[]> {
    return this.http.get<Attempt[]>(`${this.attemptsUrl}/word/${wordId}`);
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

  deleteAttempt(userId: number, wordId: number): Observable<void> {
    return this.http.delete<void>(`${this.attemptsUrl}/${userId}/${wordId}`);
  }

}
