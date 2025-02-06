import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalTrainingService {

  private apiUrl = 'http://localhost:8089/employees/uploads';  

  constructor(private http: HttpClient) {}

  submitForm(formData:FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
    
  }
}

