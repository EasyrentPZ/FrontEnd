import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('user_id');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error during logout:', error);
        this.router.navigate(['/login']);
      }
    );
  }
}
