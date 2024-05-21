import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PropertyApiResponse } from '../interfaces/property-api-response'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class ApartmentOwnerService {
  private baseUrl = '/api/v1/';  // Base URL for your API

  constructor(private http: HttpClient) { }

  getOwnerProperties(): Observable<PropertyApiResponse> {
    return this.http.get<PropertyApiResponse>(`${this.baseUrl}property/owner`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
