import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse, Company } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.post<ApiResponse<Company[]>>(
      `${this.baseUrl}/exhibitor-company-list`,
      {}
    );
  }
}
