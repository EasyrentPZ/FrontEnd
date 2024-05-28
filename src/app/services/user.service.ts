import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEndpoint = '/api/v1/users';

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<User> {
    return this.http.get(`${this.userEndpoint}/${userId}`).pipe(
      map((data: any) => new User(data))
    );
  }

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    const endpoint = `${this.userEndpoint}/${userId}/change-password`;
    const body = { currentPassword, newPassword };
    return this.http.post(endpoint, body);
  }

  getUserRoles(userId: number): Observable<string[]> {
    const rolesEndpoint = `${this.userEndpoint}/${userId}/roles`;
    return this.http.get<any[]>(rolesEndpoint).pipe(
      map((roles: any[]) => roles.map(role => role.name))
    );
  }


}
