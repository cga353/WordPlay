import { Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { ProfileComponent } from './profile/profile.component';
import { WordListComponent } from './word-list/word-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: TableroComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'word-list', component: WordListComponent }
];
