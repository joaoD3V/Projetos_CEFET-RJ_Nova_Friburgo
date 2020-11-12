import stringToDate from '../common/util/string-to-date';
import xmlToJson from '../common/util/xml-to-json';
import Http from '../http';
import CityWeather from '../model/city-weather.model';
import City from '../model/city.model';
import RainInfo from '../model/rain-info.model';
import SunInfo from '../model/sun-info.model';
import Temperature from '../model/temperature.model';
import WeatherCondition from '../model/weather-condition.model';
import WeatherForecast from '../model/weather-forecast.model';
import WindInfo from '../model/wind-info.model';

export default class WeatherForecastService {
  private static readonly NEXT_WEEK_WEATHER_API = 'http://servicos.cptec.inpe.br/XML/cidade';
  private static readonly WEEK_WEATHER_API = 'http://api.openweathermap.org/data/2.5/onecall?&appid=3e50c64ab6d7d0a3a9072c5416a08322&exclude=current,minutely,hourly,alerts&units=metric&lang=pt_br';

  private static nextWeekconditions: { [key: string]: any } = {
    ec: {
      description: 'Encoberto com chuvas isoladas',
      icon: 'rain-1',
    },
    ci: {
      description: 'Chuvas isoladas',
      icon: 'rain-1',
    },
    c: {
      description: 'Chuva',
      icon: 'rain-1',
    },
    in: {
      description: 'Instável',
      icon: 'cloudy',
    },
    pp: {
      description: 'Possibilidade de pancadas de chuva',
      icon: 'storm',
    },
    cm: {
      description: 'Chuva pela manhã',
      icon: 'rain',
    },
    cn: {
      description: 'Chuva a noite',
      icon: 'rain-1',
    },
    pt: {
      description: 'Pancadas de chuva a tarde',
      icon: 'storm',
    },
    pm: {
      description: 'Pancadas de chuva pela manhã',
      icon: 'storm',
    },
    np: {
      description: 'Nublado e pancadas de chuva',
      icon: 'storm',
    },
    pc: {
      description: 'Pancadas de chuva',
      icon: 'storm',
    },
    pn: {
      description: 'Parcialmente nublado',
      icon: 'cloudy',
    },
    cv: {
      description: 'Chuvisco',
      icon: 'rain-1',
    },
    ch: {
      description: 'Chuvoso',
      icon: 'rain-1',
    },
    t: {
      description: 'Tempestade',
      icon: 'storm',
    },
    ps: {
      description: 'Predomínio de sol',
      icon: 'sun',
    },
    e: {
      description: 'Encoberto',
      icon: 'cloudy',
    },
    n: {
      description: 'Nublado',
      icon: 'cloudy',
    },
    cl: {
      description: 'Céu claro',
      icon: 'sun',
    },
    nv: {
      description: 'Nevoeiro',
      icon: 'cloudy',
    },
    g: {
      description: 'Geada',
      icon: 'snowflake',
    },
    ne: {
      description: 'Neve',
      icon: 'snowflake',
    },
    nd: {
      description: 'Não definido',
      icon: 'cloudy-1',
    },
    pnt: {
      description: 'Pancadas de chuva a noite',
      icon: 'storm',
    },
    psc: {
      description: 'Possibilidade de chuva',
      icon: 'cloudy',
    },
    pcm: {
      description: 'Possibilidade de chuva pela manhã',
      icon: 'cloudy',
    },
    pct: {
      description: 'Possibilidade de chuva a tarde',
      icon: 'cloudy',
    },
    pcn: {
      description: 'Possibilidade de chuva a noite',
      icon: 'cloudy',
    },
    npt: {
      description: 'Nublado com pancadas a tarde',
      icon: 'cloudy',
    },
    npn: {
      description: 'Nublado com pancadas a noite',
      icon: 'cloudy',
    },
    ncn: {
      description: 'Nublado com possibilidade de chuva a noite',
      icon: 'cloudy',
    },
    nct: {
      description: 'Nublado com possibilidade de chuva a tarde',
      icon: 'cloudy',
    },
    ncm: {
      description: 'Nublado com possibilidade de chuva pela manhã',
      icon: 'cloudy',
    },
    npm: {
      description: 'Nublado com pancadas pela manhã',
      icon: 'cloudy',
    },
    npp: {
      description: 'Nublado com possibilidade de chuva',
      icon: 'cloudy',
    },
    vn: {
      description: 'Variação de nebulosidade',
      icon: 'cloudy',
    },
    ct: {
      description: 'Chuva a tarde',
      icon: 'rain',
    },
    ppn: {
      description: 'Possibilidade de pancada de chuva a noite',
      icon: 'storm',
    },
    ppt: {
      description: 'Possibilidade de pancada de chuva a tarde',
      icon: 'storm',
    },
    ppm: {
      description: 'Possibilidade de pancada de chuva pela manhã',
      icon: 'storm',
    },
  }

  private static weekConditions: { [key: string]: string } = {
    Thunderstorm: 'storm',
    Drizzle: 'rain-1',
    Rain: 'rain',
    Snow: 'snowflake',
    Mist: 'cloud-1',
    Smoke: 'cloudy',
    Haze: 'cloudy',
    Dust: 'cloudy',
    Fog: 'cloudy',
    Sand: 'tornado',
    Ash: 'tornado',
    Squall: 'storm',
    Tornado: 'tornado',
    Clear: 'sun',
    Clouds: 'cloud-1',
  }

  public static async getWeekWeatherForecast(city: City): Promise<CityWeather> {
    const response = await Http.get(
      `${this.WEEK_WEATHER_API}&lat=${city.coordinates.latitude}&lon=${city.coordinates.longitude}`,
    );
    const daily = response.data.daily.slice(0, 7);
    const weatherForecasts: WeatherForecast[] = daily.map(
      (value: any) => new WeatherForecast({
        day: this.unixTimeToDate(value.dt),
        ultraviolet: Math.round(value.uvi),
        humidity: value.humidity,
        visibility: this.metersToKm(value.visibility),
        temperature: new Temperature({
          minimum: Math.round(value.temp.min),
          maximum: Math.round(value.temp.max),
        }),
        wind: new WindInfo({
          speed: this.metersPerSecondToKmPerHour(value.wind_speed),
          degrees: value.wind_deg,
          direction: this.windDegreesToDirection(value.wind_deg),
        }),
        sun: new SunInfo({
          sunrise: this.unixTimeToDate(value.sunrise),
          sunset: this.unixTimeToDate(value.sunset),
        }),
        rain: new RainInfo({
          probability: this.decimalToPercentual(value.pop),
          volume: value.rain,
        }),
        condition: new WeatherCondition({
          description: this.capitalize(value.weather[0].description),
          icon: this.weekConditions[value.weather[0].main],
        }),
      }),
    );
    return new CityWeather({
      updated: new Date(),
      weatherForecasts,
      city,
    });
  }

  public static async getNextWeekWeatherForecast(city: City): Promise<CityWeather> {
    const response = await Http.get(
      `${this.NEXT_WEEK_WEATHER_API}/${city.coordinates.latitude}/${city.coordinates.longitude}/estendidaLatLon.xml`,
    );
    const json: any = await xmlToJson(response.data);
    const updated: Date = stringToDate(json.atualizacao);
    city = new City({
      id: city.id,
      name: json.nome,
      uf: json.uf,
      coordinates: city.coordinates,
    });
    const weatherForecasts: WeatherForecast[] = json.previsao.map(
      (value: any) => new WeatherForecast({
        day: stringToDate(value.dia),
        ultraviolet: value.iuv && parseFloat(value.iuv),
        temperature: new Temperature({
          minimum: parseInt(value.minima, 10),
          maximum: parseInt(value.maxima, 10),
        }),
        condition: new WeatherCondition({
          description: this.nextWeekconditions[value.tempo].description,
          icon: this.nextWeekconditions[value.tempo].icon,
        }),
      }),
    );
    return new CityWeather({
      city,
      updated,
      weatherForecasts,
    });
  }

  private static decimalToPercentual(decimal: number): number {
    if (!decimal) {
      return null;
    }
    return decimal * 100;
  }

  private static unixTimeToDate(unix: number): Date {
    return new Date(unix * 1000);
  }

  private static windDegreesToDirection(degrees: number): string {
    if (!degrees) {
      return null;
    }
    const value = Math.floor((degrees / 22.5) + 0.5);
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    return directions[(value % 16)];
  }

  private static metersPerSecondToKmPerHour(value: number): number {
    if (!value) {
      return null;
    }
    return value * 3.6;
  }

  private static metersToKm(value: number): number {
    return value * 1000;
  }

  private static capitalize(value: string): string {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }
}
