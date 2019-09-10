import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherData } from './weather-data.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherData: WeatherData;
  units: 'imperial' | 'metric' | '' = 'metric';
  lastCoords: { latitude: number, longitude: number };
  localTime: Date;

  constructor(
    private weatherService: WeatherService
  ) { }

  /**
   * This method is called in the beginning of the weather component lifecycle.
   */
  ngOnInit() {
    this.getGeoLocation();
  }

  /**
   * Try to get the location of the user and load weather data based on the coordinates.
   */
  getGeoLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((location) => {
        this.getWeather(location.coords);
      });
    }
  }

  /**
   * Get the weather data by making an API call via `WeatherService`.
   *
   * @param coords - The coordinates of the location.
   */
  getWeather(coords: { latitude: number, longitude: number }) {
    this.lastCoords = coords;
    this.weatherData = null;

    this.weatherService.getWeather(coords.longitude, coords.latitude, this.units).subscribe({
      next: weatherData => {
        this.weatherData = weatherData;
        this.weatherData.weather = weatherData.weather[0];

        // converts date to timezone of the result date
        this.localTime = new Date((Date.now() / 1000 + weatherData.timezone) * 1000);
      }
    });
  }

  /**
   * @returns The proper unit based on the temperature type
   */
  getTemperatureUnit() {
    switch (this.units) {
      case 'imperial': return '°F';
      case 'metric': return '°C';
      case '': return 'K';
    }
  }

}
