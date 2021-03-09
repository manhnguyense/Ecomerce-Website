import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Login } from 'src/app/models/auth/login';
import { tap, finalize, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

  }
  ngOnInit() {
    this.buildForm();
  }

  private login() {
    this.isLoading = true;
    const credentials = this.validateForm.value as Login;

    this.authService.login(credentials)
      .pipe(
        tap(res => {
          console.log(res);
          localStorage.setItem(environment.tokenKey, res.data)
          this.router.navigate(['/dashboard'])
        }),
        finalize(() => (this.isLoading = false)),
        catchError(res => {
          this.validateForm.setErrors({ "error": res.error.message });
          return throwError(res);
        })
      )
      .subscribe();
  }

  private buildForm(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.login();
  }
}
