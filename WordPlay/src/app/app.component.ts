import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableroComponent, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WordPlay';
}
