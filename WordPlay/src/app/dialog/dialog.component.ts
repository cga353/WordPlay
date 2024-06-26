import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { WordService } from '../services/word.service';
import { NgFor, NgIf, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  translations: string[] = [];
  palabraNoEncontrada: boolean = false;

  constructor(
    private wordService: WordService,
    @Inject(MAT_DIALOG_DATA) public dialog: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (this.dialog.adivinada == false && this.dialog.message === "") {
      this.palabraNoEncontrada = true;
      this.autoCloseDialog();
    }

    if (this.dialog.adivinada == true || this.dialog.title === "¡PERDISTE!") {
      this.loadTranslation();
    }
  }

  loadTranslation(): void {
    this.wordService.getTranslation(this.dialog.palabra).toPromise().then(translations => {
      if (translations && translations.length > 0) {
        this.translations = translations.slice(0, 3).map(translation => translation.text);
      }
    });
  }

  navigateToHome(): void {
    this.location.go('/home');
    window.location.reload();
    this.dialogRef.close();
  }

  autoCloseDialog(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000); // 1 segundo
  }

}
