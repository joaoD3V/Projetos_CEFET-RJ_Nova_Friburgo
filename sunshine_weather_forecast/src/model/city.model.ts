import Coordinates from './coordinates.model';

export default class City {
  public id?: string;
  public name: string;
  public uf: string;
  public isFavorite: boolean;
  public notificationOn: boolean;
  public coordinates: Coordinates;

  constructor(params: {
    id?: string;
    name?: string;
    uf?: string;
    coordinates?: Coordinates;
    isFavorite?: boolean;
    notificationOn?: boolean;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.uf = params.uf;
    this.coordinates = params.coordinates;
    this.isFavorite = params.isFavorite;
    this.notificationOn = params.notificationOn;
  }

  public isEqualTo(otherCity: City): boolean {
    if (this.id && otherCity.id) {
      return this.id === otherCity.id;
    }
    return this.uf.toLowerCase() === otherCity.uf.toLowerCase()
      && this.name.toLowerCase() === otherCity.name.toLowerCase();
  }
}
