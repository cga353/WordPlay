import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordService } from '../services/word.service';
import { Attempt } from '../interfaces/attempt';
import { Game } from '../interfaces/game';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Sort, MatSortModule, MatSort } from '@angular/material/sort';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [NavBarComponent, NgFor, NgIf, MatSliderModule, MatRadioModule, MatSlideToggleModule, MatSortModule, CommonModule],
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | undefined;
  user: User | undefined;
  words: any[] = [];
  source: string | null = '';
  filteredWords: any[] = [];
  filters = ["Hoy", "Semana", "Mes", "Año"];
  selectedRadio: string | null = null; 
  radioFilter: string | null = null;
  startDate: string | null = null; 
  endDate: string | null = null; 
  searchTerm: string = ''; 
  attemptsFilter: number | null = null; 
  showFilterOptions: boolean = false;


  constructor(private wordService: WordService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.source = params.get('source');
      this.loadWords();
    });
  }

  loadWords(): void {
    const storedUserJSON = localStorage.getItem('user');
    this.user = JSON.parse(storedUserJSON? storedUserJSON : '{}') as User;

    if (this.source === 'bar-chart') {
      this.wordService.getAttemptsByUserId(this.user.id).subscribe((data: Attempt[]) => {
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
      this.wordService.getGamesByUserId(this.user.id).subscribe((data: Game[]) => {
        const wordIds = data.map(game => game.wordId);
        this.wordService.getWordsByIds(wordIds).subscribe(words => {
          this.words = data.map(game => {
            const word = words.find(w => w.id === game.wordId);
            return { ...game, name: word.name, translations: [] };
          });
          this.fetchTranslations();
          this.filteredWords = [...this.words];
          console.warn('Pie Chart Data:', this.words); // Datos para pie-chart
        });
      });
    } else if (this.source === 'line-chart') {
      this.wordService.getGamesByUserId(this.user.id).subscribe((data: Game[]) => {
        const wordIds = data.map(game => game.wordId);
        this.wordService.getWordsByIds(wordIds).subscribe(words => {
          this.words = data.map(game => {
            const word = words.find(w => w.id === game.wordId);
            const formattedDate = new Date(game.date).toLocaleDateString();
            return { ...game, name: word.name, date: formattedDate, translations: [] };
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
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
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

  onAttemptsFilterChangeIntentos(event: any) {
    if (event.target.value < 0) {
      event.target.value =  event.target.value.substring(1); // Establecer el valor a 0 si es negativo
    }

    if (event.target.value > 6) {
      event.target.value =  6; // Establecer el valor a 0 si es negativo
    }

    const filterValue = event.target.value;
    this.attemptsFilter = filterValue !== '' ? parseInt(filterValue) : null;
    this.applyFilters();
  }

  onAttemptsFilterChangeIntroducidos(event: any) {
    if (event.target.value < 0) {
      event.target.value =  event.target.value.substring(1); // Establecer el valor a 0 si es negativo
    }

    const filterValue = event.target.value;
    this.attemptsFilter = filterValue !== '' ? parseInt(filterValue) : null;
    this.applyFilters();
  }

  onStartDateChange(event: any) {
    this.startDate = event.target.value;
    this.applyFilters();
  }

  onEndDateChange(event: any) {
    this.endDate = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredWords = this.words.filter(word => {
      const matchesSearch = word.name.toLowerCase().includes(this.searchTerm);
      const matchesRadio = this.radioFilter ? (this.radioFilter === '1' ? word.isGuessed : !word.isGuessed) : true;
      const matchesAttempts = this.attemptsFilter ? (word.nAttempt === this.attemptsFilter) ||  (word.nVeces === this.attemptsFilter): true;

      let matchesDate = true;
      if (this.startDate && word.date) {
        const wordDateParts = word.date.split('/');
        const formattedWordDate = `${wordDateParts[2]}-${wordDateParts[1]}-${wordDateParts[0]}`;
        const wordDateObj = new Date(formattedWordDate);
        const start = new Date(this.startDate);

        const wordDateWithoutTime = new Date(wordDateObj.getFullYear(), wordDateObj.getMonth(), wordDateObj.getDate());
        const startWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());

        matchesDate = wordDateWithoutTime >= startWithoutTime;
      }

      if (this.endDate && word.date) {
        const wordDateParts = word.date.split('/');
        const formattedWordDate = `${wordDateParts[2]}-${wordDateParts[1]}-${wordDateParts[0]}`;
        const wordDateObj = new Date(formattedWordDate);
        const end = new Date(this.endDate);

        const wordDateWithoutTime = new Date(wordDateObj.getFullYear(), wordDateObj.getMonth(), wordDateObj.getDate());
        const endWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());

        matchesDate = matchesDate && wordDateWithoutTime <= endWithoutTime;
      }

      return matchesSearch && matchesRadio && matchesAttempts && matchesDate;
    });
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

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  clearFilters() {
    this.selectedRadio = null;
    this.radioFilter = null;
    this.startDate = null;
    this.endDate = null;
    this.searchTerm = '';
    this.attemptsFilter = null;

    // Limpia el input de número de intentos
    const attemptsFilterInput = document.getElementById('attempts-filter') as HTMLInputElement;
    if (attemptsFilterInput) {
      attemptsFilterInput.value = '';
    }

    this.applyFilters();
  }

}
