import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Announcement } from '../shared/Announcement'; // Ensure this is the correct path

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private baseUrl = '/api/v1/';  // Base URL for your API
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  // Fetch all announcements for a specific property
  getPropertyAnnouncements(propertyId: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}property/announcements/${propertyId}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // Add a new announcement for a property
  addAnnouncement(propertyId: number, announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.baseUrl}property/announcement/add/${propertyId}`, announcement, { headers: this.headers, withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
