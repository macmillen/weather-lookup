import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { LocationData } from './location-data.model';
import { AddressComponent } from './address-component.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
  }

  onAutocompleteSelected(locationData: LocationData) {
    console.log(locationData);

    const city = this.parseCity(locationData.address_components);

    this.weatherService.getWeather(city).subscribe({
      next: weatherData => { console.log(weatherData); },
      error: err => {

      }
    });
  }

  parseCity(addressComponents: AddressComponent[]) {
    for (const a of addressComponents) {
      if (a.types.includes('locality') || a.types.includes('administrative_area_level_3')) {
        return a.long_name;
      }
    }
    return '';
  }
}
