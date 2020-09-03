import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Envelope } from './incident';


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  apiUrl = 'https://ubug6qofa8.execute-api.us-east-1.amazonaws.com/default/quark-four'

  constructor(private http: HttpClient) { }

  getIncidents(): Observable<Envelope> {
    return this.http.post<Envelope>(this.apiUrl, { method: 'list' });
  }
}
