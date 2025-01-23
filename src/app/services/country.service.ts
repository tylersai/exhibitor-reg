import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { City } from '../../types/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = environment.baseUrl;

  async getList(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/public/provinces.json`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const cities = (await response.json()) as City[];
      const countries: string[] = [];

      cities.forEach((c) => {
        if (!countries.includes(c.country)) {
          countries.push(c.country);
        }
      });

      return countries;
    } else return ['Singapore'];
  }
}
