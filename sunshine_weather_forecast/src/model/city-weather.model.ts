import City from './city.model';
import WeatherForecast from './weather-forecast.model';

export default class CityWeather {
  public updated: Date;
  public city: City;
  public weatherForecasts: WeatherForecast[];

  constructor(params: {
    updated: Date;
    city: City;
    weatherForecasts: WeatherForecast[];
  }) {
    this.updated = params.updated;
    this.city = params.city;
    this.weatherForecasts = params.weatherForecasts;
  }
}
