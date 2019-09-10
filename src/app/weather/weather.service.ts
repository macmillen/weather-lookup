import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherURL = 'http://api.openweathermap.org/data/2.5/weather';
  apiKey = 'eadb1ee61535aaa86bc16da0fe9ffedd';

  constructor(
    private http: HttpClient
  ) { }

  getWeather(cityName: string) {
    return this.http.get(`${this.weatherURL}?q=${cityName}&APPID=${this.apiKey}`);
  }
}
