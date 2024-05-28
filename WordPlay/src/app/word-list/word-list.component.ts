import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordService } from '../services/word.service';
import { Attempt } from '../interfaces/attempt';
import { Guess } from '../interfaces/guess';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [NavBarComponent, NgFor, NgIf],
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  words: any[] = [];
  source: string | null = '';

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
            return { ...attempt, name: word.name };
          });
          console.warn('Bar Chart Data:', this.words); // Datos para bar-chart
        });
      });
    } else if (this.source === 'pie-chart') {
      this.wordService.getGuessesByUserId(2).subscribe((data: Guess[]) => {
        const wordIds = data.map(guess => guess.wordId);
        this.wordService.getWordsByIds(wordIds).subscribe(words => {
          this.words = data.map(guess => {
            const word = words.find(w => w.id === guess.wordId);
            return { ...guess, name: word.name };
          });
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
            return { ...guess, name: word.name, date: formattedDate };
          });
          console.warn('Line Chart Data:', this.words); // Datos para line-chart
        });
      });
    }
  }
}
