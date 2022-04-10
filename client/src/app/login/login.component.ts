import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  form!: FormGroup;
  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public async onSubmit() {
    this.submitted = true;
    const { username, password } = this.form.controls;

    this.authService
      .login(username.value, password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/messages');
        },
        error: (err) => {
          console.error(err);
          this.submitted = false;
        },
      });
  }
}
