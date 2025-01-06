import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GryService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  gry(tytul: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/gry`, { tytul }, { withCredentials: true });
  }

  szukaj(term: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gry?q=${term}`);
  }
    
}
