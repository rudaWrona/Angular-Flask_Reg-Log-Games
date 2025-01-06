import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentykacjaService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  logowanie(nazwa: string, haslo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/logowanie`, { nazwa, haslo }, { withCredentials: true });//Ustawienie 'withCredentials: true' w opcjach zapytania HTTP mówi przeglądarce, aby dołączała ciasteczka do zapytań.
  }

  sprawdzSesje(): Observable<any> {
    //console.log('Wysyłanie zapytania do /sesja-status');
    return this.http.get(`${this.apiUrl}/sesja-status`, { withCredentials: true });
  }

  wylogowanie(): Observable<any> {
    return this.http.post(`${this.apiUrl}/wylogowanie`, {}, { withCredentials: true });
  }

  rejestruj(nazwa: string, haslo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rejestracja`, { nazwa, haslo },  { withCredentials: true });
  }

}
