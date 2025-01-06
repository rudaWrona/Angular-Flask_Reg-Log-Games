import { Component, OnInit } from '@angular/core';
import { AutentykacjaService } from '../autentykacja.service';
import { Router } from '@angular/router'
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, ViewWillEnter {

  zalogowany = false;
  uzytkownik_id: number | null = null; //oznacza, że zmienna może przechowywać wartość typu number lub null. = null na końcu każdej deklaracji oznacza, że początkowo zmienne są inicjalizowane wartością null.
  uzytkownik: string | null = null;

  constructor(private autentykacja: AutentykacjaService, private router: Router) {}

  ngOnInit() { 
    this.weryfikujSesje();
  }

  ionViewWillEnter() {
    this.weryfikujSesje();
  }

  weryfikujSesje() {
    this.autentykacja.sprawdzSesje().subscribe({
      next: (response) => {
        this.zalogowany = response.zalogowany;
        this.uzytkownik_id = response.uzytkownik_id;
        this.uzytkownik = response.uzytkownik;
      },
      error: () => {
        this.router.navigate(['/logowanie']); // Przekierowanie do logowania
      },
    });
  }

  logowanie() {
    this.router.navigate(['/logowanie']);
  }
  rejestracja() {
    this.router.navigate(['/rejestracja']);
  }

  bazaGier() {
    this.router.navigate(['/gry']);
  }

  wyloguj() {
    this.autentykacja.wylogowanie().subscribe({
      next: () => {
        console.log('Wylogowano pomyślnie');
        this.zalogowany = false;
        this.uzytkownik_id = null;
        this.uzytkownik = null;
        this.router.navigate(['/logowanie']);
      },
      error: (error) => {
        console.error('Błąd podczas wylogowywania:', error);
        alert("Wylogowanie nie powiodło się!")
      }
    });
  }

}
