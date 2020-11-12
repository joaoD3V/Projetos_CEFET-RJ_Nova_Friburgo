import RainInfo from './rain-info.model';
import SunInfo from './sun-info.model';
import Temperature from './temperature.model';
import WeatherCondition from './weather-condition.model';
import WindInfo from './wind-info.model';

export default class WeatherForecast {
  public day: Date;
  public ultraviolet: number;
  public humidity: number;
  public visibility: number;
  public temperature: Temperature;
  public condition: WeatherCondition;
  public sun: SunInfo;
  public wind: WindInfo;
  public rain: RainInfo;

  constructor(params: {
    day: Date;
    ultraviolet: number;
    humidity?: number;
    visibility?: number;
    temperature: Temperature;
    condition: WeatherCondition;
    sun?: SunInfo;
    wind?: WindInfo;
    rain?: RainInfo;
  }) {
    this.day = params.day;
    this.ultraviolet = params.ultraviolet;
    this.humidity = params.humidity;
    this.visibility = params.visibility;
    this.temperature = params.temperature;
    this.condition = params.condition;
    this.sun = params.sun;
    this.wind = params.wind;
    this.rain = params.rain;
  }
}
