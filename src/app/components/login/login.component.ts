import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginForm } from 'src/app/interfaces/login-form';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService,
    private userService: UserService
  ) { }

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    if (this.loginForm.valid) {
      const loginPayload: LoginForm = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || ''
      };
      this.authService.loginUser(loginPayload).subscribe(
        () => {
          //if (this.authService.isLoggedIn()) { ||| jeśli dobrze rozumiem, to tu i tak jest kod, który wykona się w przypadku sukcesu, więc chyba if nie potrzebny? Btw cookie jest http only więc na froncie się do niego nie dostaniesz z initializeUserFroCookie
            // Przekieruj do odpowiedniego dashboardu na podstawie roli                         ||||| To nie działa trzeba to naprawic
            // const userType = this.authService.getLoggedInUser()?.role.toLowerCase();
            // this.router.navigate([`${userType}`]);
            const userIdString = localStorage.getItem("user_id");
            if (!userIdString) {
              return; //TS się pruje jak nie sprawdzę czy nie jest nullem
            }
            const userId: number = parseInt(userIdString, 10);              
            const userRoles = this.userService.getUserRoles(userId).subscribe(
              roles => {
                if(roles.includes('TENANT'))
                  this.router.navigate(['/renter/renter-apartment']);       //jak damy radę to damy tu hello
                else if(roles.includes('OWNER'))
                  this.router.navigate(['/owner/owner-apartments']);        //tu też
                });
            this.msgService.add({ severity: 'success', summary: 'Login success', detail: 'Witaj w EasyRent' });
          //}
        },
        (error) => {
          this.msgService.add({ severity: 'error', summary: 'Login error', detail: 'Wpisz poprawne dane.' });
        }
      );
    } else {
      this.msgService.add({ severity: 'error', summary: 'Login erro', detail: 'Wpisz poprawne dane.' });
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    const offset = 80;
  
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    }
  }
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
  returnHome() {
    this.router.navigate(['/home']);
  }
  redirectToMarket() {
    this.router.navigate(['/market-search']);
  }
  redirectSection(sectionId: string) {
    this.router.navigate(['/home']);

    setTimeout(() => { // setTimeout aby dać czas na przekierowanie
      this.scrollToSection(sectionId);
    }, 100);
  }
}
