import { Store } from '../common/component';
import toast from '../common/util/toast';
import City from '../model/city.model';
import Coordinates from '../model/coordinates.model';
import FavoritePlacesService from '../service/favorite-places.service';
import GeolocationService from '../service/geolocation.service';
import NotificationService from '../service/notification.service';
import WeatherForecastService from '../service/weather-forecast.service';
import HomeView from '../view/home.view';

export default class HomeController {
  private view: HomeView;
  private favoriteService: FavoritePlacesService;
  private notificationService: NotificationService;
  private weather: Store;
  private place: Store;
  private loading: Store;

  constructor() {
    this.favoriteService = new FavoritePlacesService(
      this.onFavoritesChange,
    );
    this.notificationService = new NotificationService();
    this.weather = new Store({
      today: null,
      tomorrow: null,
      week: null,
      nextWeek: null,
    });
    this.place = new Store({
      selectedCity: null,
      favoritePlaces: this.favoriteService.favorites,
    });
    this.loading = new Store({
      isLoading: false,
    });
    this.view = new HomeView({
      weather: this.weather,
      place: this.place,
      loading: this.loading,
      onSearchChange: this.updateWeatherForecast,
      onToggleFavorite: this.onToggleFavorite,
      onToggleNotification: this.onToggleNotification,
    });
  }

  public async initialize(): Promise<void> {
    this.view.render();
    await this.initWeatherForecast();
  }

  private updateWeatherForecast = async (data: City): Promise<void> => {
    this.loading.data.isLoading = true;
    const [cityWeather, cityNextWeather] = await Promise.all([
      WeatherForecastService.getWeekWeatherForecast(data),
      WeatherForecastService.getNextWeekWeatherForecast(data),
    ]);
    const selectedCity: City = cityNextWeather.city;
    selectedCity.isFavorite = this.favoriteService.isFavorite(selectedCity);
    selectedCity.notificationOn = this.notificationService.notificationOn(selectedCity);
    this.place.data.selectedCity = selectedCity;
    [this.weather.data.today] = cityWeather.weatherForecasts;
    [, this.weather.data.tomorrow] = cityWeather.weatherForecasts;
    this.weather.data.week = cityWeather.weatherForecasts;
    this.weather.data.nextWeek = cityNextWeather.weatherForecasts;
    this.favoriteService.changeLastViewed(selectedCity);
    this.loading.data.isLoading = false;
  }

  private onToggleNotification = async (city: City): Promise<void> => {
    if (this.notificationService.notificationOn(city)) {
      try {
        city.notificationOn = false;
        await this.notificationService.removeCityNotification(city);
      } catch (error) {
        city.notificationOn = true;
      }
    } else {
      try {
        city.notificationOn = true;
        await this.notificationService.addCityNotification(city);
      } catch (error) {
        city.notificationOn = false;
      }
    }
  }

  private onToggleFavorite = (city: City): void => {
    if (this.favoriteService.isFavorite(city)) {
      this.deleteFromFavorite(city);
    } else {
      this.addToFavorite(city);
    }
  }

  private deleteFromFavorite(city: City): void {
    city.isFavorite = false;
    this.favoriteService.delete(city);
    toast(`${city.name} foi removida dos favoritos`);
  }

  private addToFavorite(city: City): void {
    try {
      city.isFavorite = true;
      this.favoriteService.add(city);
      toast(`${city.name} foi adicionada aos favoritos`);
    } catch (error) {
      city.isFavorite = false;
      toast(error.message);
    }
  }

  private onFavoritesChange = (favorites: City[]): void => {
    this.place.data.favoritePlaces = favorites;
    this.place.data.selectedCity.isFavorite = this.favoriteService.isFavorite(
      this.place.data.selectedCity,
    );
    this.notificationService.updatePlaces();
  }

  private async initWeatherForecast(): Promise<void> {
    try {
      const coordinates: Coordinates = await GeolocationService.getUserCurrentCoords();
      await this.updateWeatherForecast(new City({
        coordinates,
      }));
    } catch (error) {
      const city: City = this.favoriteService.lastViewed || this.defaultCity;
      await this.updateWeatherForecast(city);
    }
  }

  private get defaultCity(): City {
    return new City({
      id: '224',
      name: 'Brasília',
      uf: 'DF',
    });
  }
}
