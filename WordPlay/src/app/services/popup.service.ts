import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  open(data: any) {
    return this.dialog.open(DialogComponent, {
      data: data
    });

  }
  closePopup() {
    this.dialog.closeAll();
  }

}