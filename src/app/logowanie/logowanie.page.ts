import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentykacjaService } from '../autentykacja.service';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.page.html',
  styleUrls: ['./logowanie.page.scss'],
  imports: [IonicModule,
            FormsModule,]
})

export class LogowaniePage implements OnInit, ViewWillEnter {

  nazwa: string = "";
  haslo: string = "";

  zalogowany = false;
  uzytkownik_id: number | null = null; //oznacza, że zmienna może przechowywać wartość typu number lub null. = null na końcu każdej deklaracji oznacza, że początkowo zmienne są inicjalizowane wartością null.
  uzytkownik: string | null = null;

  constructor(private router: Router, private autentykacja: AutentykacjaService) { }

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

  zalogujUzytkownika() {
    if (!this.nazwa) {
      alert("Podaj nazwę użytkownika")
      return;
    } else if (!this.haslo) {
        alert("Podaj nazwę użytkownika")
        return;
    }
    
    this.autentykacja.logowanie(this.nazwa, this.haslo).subscribe({
        next: () => {
          this.router.navigate(['/home']); // Po zalogowaniu przejście na stronę główną
      },
      error: (err) => {
        console.error('Logowanie nieudane', err);
        alert('Niepoprawne dane logowania.');
      },
    });
  }

  rejestracja() {
    this.router.navigate(['/rejestracja']);
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
