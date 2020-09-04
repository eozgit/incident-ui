import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Incident, { Envelope } from './incident';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  apiUrl = 'https://ubug6qofa8.execute-api.us-east-1.amazonaws.com/default/quark-four'

  constructor(private http: HttpClient) { }

  getIncidents(): Observable<Envelope> {
    return this.http.post<Envelope>(this.apiUrl, { method: 'list' })
      .pipe(
        catchError(this.handleError)
      );
  }

  addIncident(incident: Incident): Observable<Envelope> {
    return this.http.post<Envelope>(this.apiUrl, { method: 'add', incident })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
