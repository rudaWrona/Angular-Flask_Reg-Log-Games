import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GryService } from '../gry.service';
import { AutentykacjaService } from '../autentykacja.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';


@Component({
  selector: 'app-gry',
  templateUrl: './gry.page.html',
  styleUrls: ['./gry.page.scss'],
  imports: [IonicModule,
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
          ]
})
export class GryPage implements OnInit, ViewWillEnter, OnDestroy {

  tytul: string = "";
  public gry: any;

  zalogowany = false;
  uzytkownik_id: number | null = null;
  uzytkownik: string | null = null;

  kontrolaWyszukania = new FormControl(''); //nowy obiekt klasy, która reprezentuje pojedyncze pole formularza, ('') oznacza, że zaczyna jako puste
  wyniki: any[] = [];
  isLadujeSie = false;
  private destroy$ = new Subject<void>(); //Subject to specjalny rodzaj obiektu, który działa zarówno jako obserwator, jak i obserwowalny. Umożliwia on emitowanie wartości do wszystkich subskrybentów oraz odbieranie wartości z innych obserwowalnych. Często wykorzystuje się go do czyszczenia subskrypcji w metodzie ngOnDestroy, aby uniknąć wycieków pamięci. Użycie $ oznacza Obsevable i że dana zmienna jest związana z RxJS i że można na nią subskrybować lub emitować wartości.

  constructor(private router: Router, private gryDane: GryService, private autentykacja: AutentykacjaService) { }

  wyszukajGry() {
    if (!this.tytul) {
      alert("Podaj jakiś tytuł")
      return;
    }

    this.gryDane.gry(this.tytul).subscribe({
      next: (g) => this.gry = g,
      error: (err) => {console.error('Błąd połączenia', err)},
    });
  }

  private setupSearch() {
    this.kontrolaWyszukania.valueChanges.pipe( //tworzy Observable, który emituje za każdym razem, kiedy użytkownik wpisuje coś w pole. Pole związane jest dyrektywą [formControl]="kontrolaWyszukania".
        takeUntil(this.destroy$), //odsuksrybuje się, kiedy komponent zostanie zniszczony
        debounceTime(300), //czeka 300 mls przed kolejną emisją
        distinctUntilChanged(), //emituje tylko jeśli obecna wartość jest inna, niż poprzednia
        switchMap(fraza => { //bierze wpisaną frazę i zwraca nowy obiekt Observable, do którego mozna subskrybować.
            this.isLadujeSie = true;
            return this.gryDane.szukaj(fraza);
        })
    ).subscribe({ //zapisuje nadesłane dane do zmiennej wyiniki, ablo wyrzuca błąd
        next: (daneZAPI) => {
            this.wyniki = daneZAPI;
            this.isLadujeSie = false;
        },
        error: (error) => {
            console.error('Błąd wyszukiwania:', error);
            this.isLadujeSie = false;
        }
    });
}

ngOnInit() { 
  this.weryfikujSesje();
  this.setupSearch();
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
      this.router.navigate(['/logowanie']);
    },
  });
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

home() {
  this.router.navigate(['/home']);
}
}
