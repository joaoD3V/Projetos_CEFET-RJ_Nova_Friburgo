import Http from '../http';
import City from '../model/city.model';
import Coordinates from '../model/coordinates.model';

export default class GeolocationService {
  private static readonly SEARCH_CITY_API = 'https://api.opencagedata.com/geocode/v1/json?key=0bd6dc7b0be54eca9ce0086ab7ddca1d&no_annotations=1&language=pt-BR&countrycode=br&q'

  public static getUserCurrentCoords(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        resolve(new Coordinates({
          latitude,
          longitude,
        }));
      }, (error) => {
        reject(error);
      });
    });
  }

  public static async searchCity(city: string): Promise<City[]> {
    const response = await Http.get(
      `${this.SEARCH_CITY_API}=${city}`,
    );
    const { results } = response.data;
    return results
      .filter((value: any) => value.components._type === 'city')
      .map((value: any) => new City({
        name: value.components.city || value.components.town,
        uf: value.components.state_code,
        coordinates: new Coordinates({
          latitude: value.geometry.lat,
          longitude: value.geometry.lng,
        }),
      }));
  }
}
