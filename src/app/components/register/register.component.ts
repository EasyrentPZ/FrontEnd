import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegistrationForm } from 'src/app/interfaces/registration-form';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator // This ensures the passwords match
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}


  get name() {
    return this.registerForm.controls['name'];
  }
  get lastname() {
    return this.registerForm.controls['lastname'];
  }
  get username() {
    return this.registerForm.controls['username'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
  
  
  submitDetails() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...postData } = this.registerForm.value as any; // Remove confirmPassword from postData

      this.authService.registerUser(postData as RegistrationForm).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Registration Success', detail: 'You have been successfully registered.' });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Registration Error', detail: 'Failed to register. Please check your details and try again.' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Invalid Form', detail: 'Please fill out the form correctly before submitting.' });
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
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  returnHome() {
    this.router.navigate(['/home']);
  }
  redirectSection(sectionId: string) {
    this.router.navigate(['/home']);

    setTimeout(() => { // setTimeout aby dać czas na przekierowanie
      this.scrollToSection(sectionId);
    }, 100);
  }
}
