// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/read`);
  }

  createData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }

  updateData(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, data);
  }
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
