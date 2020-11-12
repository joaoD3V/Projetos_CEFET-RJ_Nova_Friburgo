import { FAVORITES_KEY, SERVER } from '../common/constants';
import toast from '../common/util/toast';
import Http from '../http';
import City from '../model/city.model';

export default class NotificationService {
  public places: City[];

  constructor() {
    this.updatePlaces();
  }

  public updatePlaces(): void {
    const cities: any[] = JSON.parse(
      localStorage.getItem(FAVORITES_KEY),
    ) || [];
    this.places = cities.map((city) => new City(city));
  }

  public async addCityNotification(city: City): Promise<void> {
    if (!await this.hasPermission()) {
      throw new Error('Permisão negada');
    }
    await Http.post(`${SERVER}/city`, city);
    this.commit(city);
  }

  public async removeCityNotification(city: City): Promise<void> {
    if (!await this.hasPermission()) {
      throw new Error('Permisão negada');
    }
    await Http.post(`${SERVER}/city/delete`, city);
    this.commit(city);
  }

  public async hasPermission(): Promise<boolean> {
    if (Notification.permission !== 'granted') {
      return this.requestNotificationPermission();
    }
    return true;
  }

  public async requestNotificationPermission(): Promise<boolean> {
    if (Notification.permission === 'default') {
      toast('Clique em "Permitir" para que possamos alertá-lo.');
    }
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      toast('Você precisa permitir para ser notificado!');
    }
    return permission === 'granted';
  }

  public notificationOn(city: City): boolean {
    return this.places.some(
      (value) => value.isEqualTo(city) && value.notificationOn,
    );
  }

  private commit(city: City): void {
    const index = this.places.findIndex(
      (place) => place.isEqualTo(city),
    );
    this.places.splice(index, 1, city);
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(this.places),
    );
  }
}
