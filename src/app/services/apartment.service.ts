import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PropertyApiResponse } from '../interfaces/property-api-response';
import { PropertyAddRequestDto } from '../interfaces/property-add-request-dto';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private baseUrl = '/api/v1/';  // Base URL for your API

  constructor(private http: HttpClient) { }

  getApartments(filters: any): Observable<PropertyApiResponse> {
    return this.http.get<PropertyApiResponse>(
      `${this.baseUrl}public?${this.serializeFilters(filters)}`, 
      { withCredentials: true }  // Include credentials with the request
    ).pipe(
      catchError(this.handleError)
    );    
  }
  
  getFeatureNames(): Observable<string[]> {
    return this.http.get<{ id: number, name: string }[]>(`${this.baseUrl}features`).pipe(
      map(features => features.map(feature => feature.name))
    );
  }

  getCityNames(country: string): Observable<string[]> {
    return this.http.get<{ id: number, country: string, region: string, cityName: string }[]>(
      `${this.baseUrl}filters/country/${country}`
    ).pipe(
      map(response => response.map(item => item.cityName)),
      catchError(this.handleError)
    );
  }

  addProperty(data: PropertyAddRequestDto): Observable<any> {
    const formData = new FormData();
    formData.append('address', data.address);
    formData.append('area', data.area.toString());
    formData.append('description', data.description);
    formData.append('pets', data.pets.toString());
    formData.append('city', data.city);
    formData.append('rentAmount', data.rentAmount.toString());
    formData.append('utilityCost', data.utilityCost.toString());
    formData.append('deposit', data.deposit.toString());
    formData.append('streetName', data.streetName);
    formData.append('livingRooms', data.livingRooms.toString());
    data.features.forEach(feature => formData.append('features', feature));
    data.images.forEach(image => formData.append('images', image));

    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');
    return this.http.post<any>(`${this.baseUrl}property/add`, formData, { headers }).pipe(
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
