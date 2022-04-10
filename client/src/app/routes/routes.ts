import { Route } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MessagesComponent } from '../messages/messages.component';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'messages', component: MessagesComponent },
];
