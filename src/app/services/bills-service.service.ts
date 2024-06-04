import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient to make HTTP requests
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Bill } from '../shared/Bill';

@Injectable({
  providedIn: 'root'
})
export class BillsServiceService {

  constructor(private http: HttpClient) { }

  addPayment(paymentData: FormData, apartmentId: number) {
    console.log("siema");
    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');
    return this.http.post<any>('/api/v1/payment/add/' + apartmentId, paymentData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getBills(id: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`/api/v1/payment/payments/` + id).pipe(
      catchError(this.handleError)
    );
  }

  getBillPdf(id: number): Observable<Blob> {
    return this.http.get(`/api/v1/payment/${id}`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
