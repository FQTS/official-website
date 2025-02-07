import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalTrainingService {

  private apiUrl = 'http://localhost:8089/';  

  constructor(private http: HttpClient) {}

  contactenquiry(formData:FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'contact/enquiry', formData);
  }
  
  clientenquiry(formData:FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'contact-requests/enquiry', formData);
  }
  getCourse(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'courses');
  }
}

