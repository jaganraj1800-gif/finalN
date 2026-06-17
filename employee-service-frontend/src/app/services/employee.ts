import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/employees';

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  getEmployeeById(id: string) {
    return this.http.get(`http://localhost:8080/api/employees/${id}`);
  }

  updateEmployee(id: string, data: any) {
    return this.http.put(
      `http://localhost:8080/api/employees/update/${id}`,
      data
    );
  }
  downloadReport(id: string) {
    return this.http.get(
      `http://localhost:8080/api/employees/report/${id}`,
      {
        responseType: 'blob'
      }
    );
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, employee);
  }

  transliterateToTamil(text: string): Observable<string> {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=ta-t-i0-und&num=1`;
    return this.http.get<any>(url).pipe(
      map(response => {
        try {
          if (response && response[0] === 'SUCCESS') {
            return response[1][0][1][0] || '';
          }
        } catch (e) {
          console.error('Failed to parse transliteration response:', e);
        }
        return '';
      })
    );
  }
}