import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, ExhibitorPayload } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(exhibitorPayload: ExhibitorPayload) {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/add-exhibitor`,
      exhibitorPayload
    );
  }
}
