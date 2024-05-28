import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PropertyApiResponse } from '../interfaces/property-api-response'; // Ensure this path is correct
import { Property } from '../shared/Property'; // Assuming you have a detailed single property interface or class

@Injectable({
  providedIn: 'root'
})
export class ApartmentOwnerService {
  private baseUrl = '/api/v1/';  // Base URL for your API

  constructor(private http: HttpClient) { }

  // Fetch all properties owned by the logged-in owner
  getOwnerProperties(): Observable<PropertyApiResponse> {
    return this.http.get<PropertyApiResponse>(`${this.baseUrl}property/owner`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // Fetch a single property by ID
  getOwnerPropertyById(propertyId: number): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}property/owner/properties/${propertyId}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
