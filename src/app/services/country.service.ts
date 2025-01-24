import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { City, Country } from '../../types/country';
import { DEFAULT_COUNTRIES } from '../../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = environment.baseUrl;

  async getListFromProvinces(): Promise<string[]> {
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
    } else return DEFAULT_COUNTRIES;
  }

  async getListFromExternalSource(): Promise<string[]> {
    const response = await fetch(
      `https://restcountries.com/v3.1/independent?status=true&fields=name`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (response.ok) {
      const countries = (await response.json()) as Country[];
      return countries
        .map((c) => c.name.common)
        .sort((a, b) => a.localeCompare(b));
    } else return DEFAULT_COUNTRIES;
  }
}
