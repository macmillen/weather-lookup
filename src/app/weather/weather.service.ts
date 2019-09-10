import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from './weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = 'eadb1ee61535aaa86bc16da0fe9ffedd';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Performs an GET call to openweathermap.org to retrieve the weather data.
   *
   * @param lon - Longitude
   * @param lat - Latitude
   * @param units - Unit system of the temperature
   * @returns An Observable with the weather data.
   */
  getWeather(lon: number, lat: number, units: 'imperial' | 'metric' | '') {
    return this.http.get<WeatherData>(`${this.weatherURL}?lat=${lat}&lon=${lon}&APPID=${this.apiKey}&units=${units}`);
  }
}
