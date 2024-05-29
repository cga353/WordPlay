import { Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { ProfileComponent } from './profile/profile.component';
import { WordListComponent } from './word-list/word-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: TableroComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'word-list', component: WordListComponent },
    { path: "login", component: LoginComponent, pathMatch: "full" },
    { path: "register", component: RegisterComponent, pathMatch: "full" },

];
