import { Component} from '@angular/core';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(private popupService: PopupService) {}

  openPopup() {
    this.popupService.openPopup();
  }
}
