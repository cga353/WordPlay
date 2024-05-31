import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordService } from '../services/word.service';
import { Attempt } from '../interfaces/attempt';
import { Guess } from '../interfaces/guess';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgFor, NgIf } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Sort, MatSortModule, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [NavBarComponent, NgFor, NgIf, MatSliderModule, MatRadioModule, MatSlideToggleModule, MatSortModule],
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | undefined;
  words: any[] = [];
  source: string | null = '';
  filteredWords: any[] = [];
  filters = ["Hoy", "Semana", "Mes", "Año"];
  selectedRadio: string | null = null; // Almacena el valor seleccionado actualmente
  radioFilter: string | null = null; // Almacena el filtro actual
  startDate: string | null = null; // Fecha de inicio
  endDate: string | null = null; // Fecha de fin

  constructor(private wordService: WordService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.source = params.get('source');
      this.loadWords();
    });
  }

  loadWords(): void {
    if (this.source === 'bar-chart') {
      this.wordService.getAttemptsByUserId(2).subscribe((data: Attempt[]) => {
        const wordIds = data.map(attempt => attempt.wordId);
        this.wordService.getWordsByIds(wordIds).subscribe(words => {
          this.words = data.map(attempt => {
            const word = words.find(w => w.id === attempt.wordId);
            return { ...attempt, name: word.name, translations: [] };
          });
          this.fetchTranslations();
          this.filteredWords = [...this.words];
          console.warn('Bar Chart Data:', this.words); // Datos para bar-chart
        });
      });
    } else if (this.source === 'pie-chart') {
      this.wordService.getGuessesByUserId(2).subscribe((data: Guess[]) => {
        const wordIds = data.map(guess => guess.wordId);
        this.wordService.getWordsByIds(wordIds).subscribe(words => {
          this.words = data.map(guess => {
            const word = words.find(w => w.id === guess.wordId);
            return { ...guess, name: word.name, translations: [] };
          });
          this.fetchTranslations();
          this.filteredWords = [...this.words];
          console.warn('Pie Chart Data:', this.words); // Datos para pie-chart
        });
      });
    } else if (this.source === 'line-chart') {
      this.wordService.getGuessesByUserId(2).subscribe((data: Guess[]) => {
        const wordIds = data.map(guess => guess.wordId);
        this.wordService.getWordsByIds(wordIds).subscribe(words => {
          this.words = data.map(guess => {
            const word = words.find(w => w.id === guess.wordId);
            const formattedDate = new Date(guess.date).toLocaleDateString();
            return { ...guess, name: word.name, date: formattedDate, translations: [] };
          });
          this.fetchTranslations();
          this.filteredWords = [...this.words];
          console.warn('Line Chart Data:', this.words); // Datos para line-chart
        });
      });
    }
  }

  fetchTranslations(): void {
    const translationPromises = this.words.map(word =>
      this.wordService.getTranslation(word.name).toPromise().then(translations => {
        if (translations && translations.length > 0) {
          word.translations = translations.map(translation => translation.text);
        }
      })
    );

    Promise.all(translationPromises).then(() => {
      this.filteredWords = [...this.words];
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.applyFilters(searchTerm);
  }

  onFilterChange(event: any) {
    this.source = event.target.value;
    this.loadWords(); // Recargar palabras cuando se cambia el filtro
  }

  
onRadioFilterChange(event: any) {
  const newValue = event.value;

  if (this.selectedRadio === newValue) {
    // Si se hace clic en el radio botón ya seleccionado, desmarcarlo
    this.selectedRadio = null;
    this.radioFilter = null;
  } else {
    // Si se hace clic en un radio botón diferente, actualizar el valor seleccionado
    this.selectedRadio = newValue;
    this.radioFilter = newValue;
  }

  this.applyFilters();
}

onAttemptsFilterChange(event: any) {
  const filterValue = event.target.value;
  const attemptsFilter = filterValue !== '' ? parseInt(filterValue) : null;
  this.applyFilters('', attemptsFilter);
}

onStartDateChange(event: any) {
  const startDate = event.target.value;
  this.applyFilters('', null, startDate, this.endDate);
}

// Método para manejar el cambio en el filtro de fecha de fin
onEndDateChange(event: any) {
  const endDate = event.target.value;
  this.applyFilters('', null, this.startDate, endDate);
}


// Método para aplicar los filtros
applyFilters(searchTerm: string = '', attemptsFilter: number | null = null, startDate: string | null = null, endDate: string | null = null) {
  this.filteredWords = this.words.filter(word => {
    const matchesSearch = word.name.toLowerCase().includes(searchTerm);
    const matchesRadio = this.radioFilter ? (this.radioFilter === '1' ? word.isGuessed : !word.isGuessed) : true;
    const matchesAttempts = attemptsFilter ? (word.nAttempt === attemptsFilter) : true;
    
    // Verificar si la fecha de la palabra está dentro del rango seleccionado
    let matchesDate = true;
    if (startDate && endDate) {
      const wordDate = new Date(word.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = wordDate >= start && wordDate <= end;
    }

    return matchesSearch && matchesRadio && matchesAttempts && matchesDate;
  });
}

  toggleFilter(filter: any) {
    filter.active = !filter.active;
    // Update filteredWords based on active filters
  }

  sortData(sort: Sort) {
    const data = this.filteredWords.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredWords = data;
      return;
    }

    this.filteredWords = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'nVeces':
          return this.compare(a.nVeces, b.nVeces, isAsc);
        case 'isGuessed':
          return this.compare(a.isGuessed, b.isGuessed, isAsc);
        case 'nAttempt':
          return this.compare(a.nAttempt, b.nAttempt, isAsc);
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        default:
          return 0;
      }
    });
  }

  // Método de utilidad para comparación
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
