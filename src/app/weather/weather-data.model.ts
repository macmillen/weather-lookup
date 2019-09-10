
/**
 * Contains the data that gets returned by `WeatherService`.
 */
export interface WeatherData {
    name: string;
    timezone: number;
    weather: Weather;
    main: MainData;
}

export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface MainData {
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}
