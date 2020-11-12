import { FAVORITES_KEY } from '../common/constants';
import City from '../model/city.model';

export default class FavoritePlacesService {
  private static readonly LAST_VIEWED_KEY: string = 'last-viewed-place';
  private static readonly MAX_LIMIT: number = 5;

  public favorites: City[];
  public lastViewed: City;
  private onPlacesChange: (places: City[]) => void;

  constructor(onPlacesChange: (places: City[]) => void) {
    const places: any[] = JSON.parse(
      localStorage.getItem(FAVORITES_KEY),
    ) || [];
    this.favorites = places.map((place) => new City(place));
    const lastViewed = JSON.parse(
      localStorage.getItem(FavoritePlacesService.LAST_VIEWED_KEY),
    );
    if (lastViewed) {
      this.lastViewed = new City(lastViewed);
    }
    this.onPlacesChange = onPlacesChange;
  }

  private commit(places: City[]): void {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(places),
    );
    this.onPlacesChange(places);
  }

  public add(place: City): void {
    if (this.favorites.length === FavoritePlacesService.MAX_LIMIT) {
      throw new Error('Você atingiu o máximo de favoritos');
    }
    this.favorites.push(place);
    this.commit(this.favorites);
  }

  public delete(place: City): void {
    this.favorites = this.favorites.filter(
      (favorite) => !favorite.isEqualTo(place),
    );
    this.commit(this.favorites);
  }

  public changeLastViewed(city: City): void {
    this.lastViewed = city;
    localStorage.setItem(
      FavoritePlacesService.LAST_VIEWED_KEY,
      JSON.stringify(city),
    );
  }

  public isFavorite(city: City): boolean {
    return this.favorites.some(
      (favorite) => favorite.isEqualTo(city),
    );
  }
}
