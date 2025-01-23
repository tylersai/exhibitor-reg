import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ExhibitorPayload } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private baseUrl = environment.baseUrl;

  private async register(payload: ExhibitorPayload) {
    const response = await fetch(`${this.baseUrl}/api/add-exhibitor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      return response.json();
    } else throw await response.json();
  }

  registerAll(payloads: ExhibitorPayload[]) {
    return Promise.allSettled(payloads.map((el) => this.register(el)));
  }
}
