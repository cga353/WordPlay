import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { WordService } from '../services/word.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  translations: string[] = [];

  constructor(private wordService: WordService,
    @Inject(MAT_DIALOG_DATA) public dialog: any) { }


  ngOnInit(): void {
    if(this.dialog.adivinada == true){
      this.loadTranslation();
    }
  }

  loadTranslation(): void {
    this.wordService.getTranslation(this.dialog.palabraAdivinar).toPromise().then(translations => {
      if (translations && translations.length > 0) {
        this.translations = translations.map(translation => translation.text);
      }
    });
  }


}
