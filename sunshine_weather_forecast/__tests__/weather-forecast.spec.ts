import City from '../src/model/city.model';
import Coordinates from '../src/model/coordinates.model';
import WeatherForecastService from '../src/service/weather-forecast.service';

describe('Weather forecast to week by coords', () => {
  it('should return a city weather', async () => {
    const coordinates = new Coordinates({
      latitude: -22.90,
      longitude: -47.06,
    });
    const cityWeather = await WeatherForecastService.getWeekWeatherForecast(new City({
      coordinates,
    }));

    expect(cityWeather.updated).toBeInstanceOf(Date);
    expect(cityWeather.weatherForecasts).toHaveLength(7);
  });
});

describe('Weather forecast to next week by coords', () => {
  it('should return a city weather', async () => {
    const coordinates = new Coordinates({
      latitude: -22.71,
      longitude: -45.11,
    });
    const cityWeather = await WeatherForecastService.getNextWeekWeatherForecast(new City({
      coordinates,
    }));

    expect(cityWeather.city.name).toBe('Lorena');
    expect(cityWeather.city.uf).toBe('SP');
    expect(cityWeather.updated).toBeInstanceOf(Date);
    expect(cityWeather.weatherForecasts).toHaveLength(7);
  });
});
