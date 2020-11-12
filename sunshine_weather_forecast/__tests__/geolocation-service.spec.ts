import City from '../src/model/city.model';
import Coordinates from '../src/model/coordinates.model';
import GeolocationService from '../src/service/geolocation.service';

describe('Geolocation service', () => {
  it('should return a valid coords', async () => {
    const latitude: number = -22.90;
    const longitude: number = -47.06;
    const geolocationMock = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => Promise.resolve(success({
          coords: {
            latitude,
            longitude,
          },
        }))),
    };
    (global.navigator as any).geolocation = geolocationMock;
    const coords: Coordinates = await GeolocationService.getUserCurrentCoords();
    expect(coords).toBeInstanceOf(Coordinates);
    expect(coords.latitude).toBe(latitude);
    expect(coords.longitude).toBe(longitude);
  });

  it('should be return a valid city', async () => {
    const search: string = 'nova friburgo';
    const cities: City[] = await GeolocationService.searchCity(search);
    expect(cities).toHaveLength(1);
    expect(cities[0].coordinates).not.toBeNull();
    expect(cities[0].name).toBe('Nova Friburgo');
    expect(cities[0].uf).toBe('RJ');
  });
});
