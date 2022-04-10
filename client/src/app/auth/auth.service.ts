import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  public login(username: string, password: string) {
    return this.http
      .post(
        `${environment.apiUrl}/auth/login`,
        { username, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token) => {
          localStorage.setItem(this.tokenKey, token);
        })
      );
  }

  public getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
