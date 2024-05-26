import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/auth-token';
import { RegistrationForm } from 'src/app/interfaces/registration-form';
import { LoginForm } from '../interfaces/login-form';

@Injectable({
  providedIn: 'root'})
export class AuthService {
  private loggedInUser: User | null = null;
  //private baseUrl = 'https://localhost:8090';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  loginUser(loginForm: LoginForm): Observable<any> {
    const loginEndpoint = `/api/v1/auth/signin`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(loginEndpoint, loginForm, { headers, withCredentials: true }).pipe(
      tap((response: any) => {
        localStorage.setItem('user_id', response.user_id);
        this.initializeUserFromCookie(); // Assuming cookie handling setup
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  logout(): void {
    localStorage.removeItem('token'); // Assuming token is stored in localStorage
    this.loggedInUser = null; // Reset the user state
  }

  private initializeUserFromCookie(): void {
    const token = this.getCookie('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken) {
        this.loggedInUser = {
          email: decodedToken.sub,
          role: decodedToken.roles[0]
        };
      }
    }
  }

  getCookie(name: string): string | null {
    let cookieValue = null;
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieName, cookieVal] = cookie.split('=');
        if (cookieName.trim() === name) {
          cookieValue = cookieVal;
          break;
        }
      }
    }
    return cookieValue;
  }


  registerUser(registrationData: RegistrationForm): Observable<any> {
    const registerUrl = `/api/v1/auth/signup`;
    return this.http.post(registerUrl, registrationData, { headers: this.headers, withCredentials: true })
      .pipe(
        tap(response => {
          console.log('Registration successful', response);
        }, error => {
          console.error('Registration failed', error);
        })
      );
  }
}
