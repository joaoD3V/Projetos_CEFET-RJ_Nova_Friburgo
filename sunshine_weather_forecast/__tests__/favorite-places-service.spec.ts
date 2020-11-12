import City from '../src/model/city.model';
import FavoritePlacesService from '../src/service/favorite-places.service';

describe('Favorite places service', () => {
  it('should add and delete a favorite place', () => {
    const service = new FavoritePlacesService(
      () => null,
    );
    const city = new City({
      name: 'Nova Friburgo',
      uf: 'RJ',
    });
    service.add(city);
    expect(service.favorites).toHaveLength(1);
    expect(service.isFavorite(city)).toBe(true);

    service.delete(city);
    expect(service.favorites).toHaveLength(0);
    expect(service.isFavorite(city)).toBe(false);
  });

  it('should throw error on try add more than max favorite places', () => {
    const service = new FavoritePlacesService(
      () => null,
    );
    service.add(new City({
      name: 'Nova Friburgo',
      uf: 'RJ',
    }));
    service.add(new City({
      name: 'Carmo',
      uf: 'RJ',
    }));
    service.add(new City({
      name: 'Teresópolis',
      uf: 'RJ',
    }));
    service.add(new City({
      name: 'Petrópolis',
      uf: 'RJ',
    }));
    service.add(new City({
      name: 'Rio de Janeiro',
      uf: 'RJ',
    }));
    expect(() => service.add(new City({
      name: 'Nitéroi',
      uf: 'RJ',
    }))).toThrow('Você atingiu o máximo de favoritos');
  });

  it('should add a last viewed place', () => {
    const service = new FavoritePlacesService(
      () => null,
    );
    const city = new City({
      name: 'Nova Friburgo',
      uf: 'RJ',
    });
    expect(service.lastViewed).toBeUndefined();
    service.changeLastViewed(city);
    expect(service.lastViewed).toBe(city);
  });
});
