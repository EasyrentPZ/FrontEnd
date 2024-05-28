import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Report } from '../shared/Report'; // Ensure this path is correct based on your project structure

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseUrl = '/api/v1/property';  // Base URL for your API
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  // Fetch all reports for a specific property
  getReportsByPropertyId(propertyId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/tickets/${propertyId}`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add a new report
  addReport(report: Report): Observable<Report> {
    return this.http.post<Report>(`${this.baseUrl}/ticket/add`, report, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
