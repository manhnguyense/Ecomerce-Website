import { JwtService } from './jwt.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '@models/auth/login';
import { BaseResponse } from '@models/base-response';
import { environment } from '@env';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtHelperService: JwtHelperService,
    private readonly jwtService: JwtService) {
  }

  login(request: Login): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/users/authenticate`, request).pipe(
      tap(result => {
        if (result.isSuccessed) {
          const tokenObject = this.jwtHelperService.decodeToken(result.data);
          this.jwtService.setToken(result.data, tokenObject.exp)
        }
      }),
      catchError(error => {
        return of(error.error);
      })
    );
  }

  isAuthenticated() {
    return this.jwtService.getToken() != null;
  }
}
