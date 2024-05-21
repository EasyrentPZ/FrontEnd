import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PropertyApiResponse } from '../interfaces/property-api-response';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private baseUrl = '/api/v1/';  // Base URL for your API

  constructor(private http: HttpClient) { }

  getApartments(filters: any): Observable<PropertyApiResponse> {
    return this.http.get<PropertyApiResponse>(
      `${this.baseUrl}property?${this.serializeFilters(filters)}`, 
      { withCredentials: true }  // Include credentials with the request
    ).pipe(
      catchError(this.handleError)
    );    
  }

  private serializeFilters(filters: any): string {
    return Object.keys(filters).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`).join('&');
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
