import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/User';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  currentPassword: string = '';
  newPassword: string = '';

  constructor(private userService: UserService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    const userIdString = localStorage.getItem("user_id");
    const userId: number | null = userIdString !== null ? parseInt(userIdString, 10) : null;

    if (userId !== null && !isNaN(userId)) {
      this.userService.getUserById(userId).subscribe(
        (data: User) => {
          this.user = data;
        },
        error => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('Invalid user ID found in local storage.');
    }
  }

  isPopupVisible = false;

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  returnHome() {
    this.router.navigate(['/home']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    const offset = 80;

    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    }
  }

  changePassword() {
    const userIdString = localStorage.getItem("user_id");
    const userId: number | null = userIdString !== null ? parseInt(userIdString, 10) : null;

    if (userId !== null && !isNaN(userId) && this.currentPassword && this.newPassword) {
      this.userService.changePassword(userId, this.currentPassword, this.newPassword).subscribe(
        response => {
          // Handle success
          console.log("Password changed successfully");
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully' });
        },
        error => {
          // Handle error
          console.error('Error changing password:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to change password' });
        }
      );
    } else {
      console.error('Invalid user ID or password data.');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid user ID or password data' });
    }
  }
}
