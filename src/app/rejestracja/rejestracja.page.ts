import { Component, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter, } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AutentykacjaService } from '../autentykacja.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.page.html',
  styleUrls: ['./rejestracja.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
  ]
  
})
export class RejestracjaPage implements OnInit, ViewWillEnter {

  nazwa: string = '';
  haslo: string = '';
  potwierdzenie: string = '';

  zalogowany = false;
  uzytkownik_id: number | null = null; //oznacza, że zmienna może przechowywać wartość typu number lub null. = null na końcu każdej deklaracji oznacza, że początkowo zmienne są inicjalizowane wartością null.
  uzytkownik: string | null = null;


  constructor(private uzytkownikDane: AutentykacjaService, private router: Router) { }

  ngOnInit() { 
    this.weryfikujSesje();
  }

  ionViewWillEnter() {
    this.weryfikujSesje();
  }

  zarejestrujUzytkownika() {
    if (!this.nazwa) {
      alert('Podaj nazwę użytkownika, jakiej chcesz używać');
      return;
    } else if (!this.haslo) {
      alert("Podaj poprawne hasło.");
      return;
    } else if ((this.haslo != this.potwierdzenie)) {
      alert("Podaj poprawne hasło dwukrotnie.");
      return;
    }
        
  this.uzytkownikDane.rejestruj(this.nazwa, this.haslo).subscribe({
    next: () => {
      this.router.navigate(['/logowanie']);
    },
    error: (err) => {
      console.error('Rejestracja nieudana', err);
      alert('Nazwa zajęta.');
    },
  })
  }

  logowanie() {
    this.router.navigate(['/logowanie']);
  }

  weryfikujSesje() {
    this.uzytkownikDane.sprawdzSesje().subscribe({
      next: (response) => {
        this.zalogowany = response.zalogowany;
        this.uzytkownik_id = response.uzytkownik_id;
        this.uzytkownik = response.uzytkownik;
      },
      error: () => {
        this.router.navigate(['/rejestracja']); // Przekierowanie do logowania
      },
    });
  }

  wyloguj() {
    this.uzytkownikDane.wylogowanie().subscribe({
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
