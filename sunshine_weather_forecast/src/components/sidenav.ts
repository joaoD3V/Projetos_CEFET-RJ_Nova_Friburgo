import { Sidenav as MSidenav } from 'materialize-css';

import { Component, Store } from '../common/component';
import icon from '../common/util/icon';
import City from '../model/city.model';

export default class Sidenav extends Component {
  private onToggleFavorite: (city: City) => void;
  private onToggleNotification: (city: City) => void;
  private onPlaceChange: (city: City) => void;

  constructor(params: {
    store: Store,
    onToggleFavorite: (city: City) => void,
    onPlaceChange: (city: City) => void,
    onToggleNotification: (city: City) => void,
    el: string,
  }) {
    super({
      el: params.el,
      store: params.store,
      template: (data: {selectedCity: City, favoritePlaces: City[]}) => `
        <ul id="sidenav" class="sidenav sidenav-fixed">
          <li>
            <div class="user-view pb-1">
              <div class="background">
              </div>
              <img class="circle mx-auto" src="${icon('logo')}">
              <h1 class="center grey-text text-darken-3 name font-size-2">Sunshine</h1>
              <div class="mt-5 grey-text text-darken-2 name font-size-1-3">
                ${data.selectedCity.name}, ${data.selectedCity.uf}
                <button class="favorite btn-flat pink-text px-2">
                  <i class="material-icons font-size-1-6">${data.selectedCity.isFavorite ? 'favorite' : 'favorite_border'}</i>
                </button>
              </div>
            </div>
          </li>
          <li>
          <li><div class="divider"></div></li>
          <li><a class="subheader mt-3">Locais Favoritos</a></li>
          ${data.favoritePlaces.length ? this.favoritePlaces(data.favoritePlaces) : this.favoritesEmpty}
        </ul>
      `,
      setup: (element, data) => {
        const sidenav = element.querySelector('#sidenav');
        MSidenav.init(sidenav);
        this.setupFavorites(element, data);
      },
    });
    this.onToggleFavorite = params.onToggleFavorite;
    this.onPlaceChange = params.onPlaceChange;
    this.onToggleNotification = params.onToggleNotification;
  }

  private setupFavorites(
    element: Element,
    data: {selectedCity: City, favoritePlaces: City[]},
  ): void {
    const favoritebtn = element.querySelector('.favorite');
    favoritebtn.addEventListener('click', () => {
      this.onToggleFavorite(data.selectedCity);
    });
    const places = element.querySelectorAll('.city');
    places.forEach((value, index) => {
      value.addEventListener('click', (event: any) => {
        event.preventDefault();
        if (!data.selectedCity.isEqualTo(data.favoritePlaces[index])) {
          this.onPlaceChange(data.favoritePlaces[index]);
        }
      });
    });
    const clears = element.querySelectorAll('.remove');
    clears.forEach((value, index) => {
      value.addEventListener('click', (event: any) => {
        event.stopPropagation();
        this.onToggleFavorite(data.favoritePlaces[index]);
      });
    });
    const notifications = element.querySelectorAll('.notification');
    notifications.forEach((value, index) => {
      value.addEventListener('click', (event: any) => {
        event.stopPropagation();
        this.onToggleNotification(data.favoritePlaces[index]);
      });
    });
  }

  private favoritePlaces(favoritePlaces: City[]): string {
    return favoritePlaces.map((favorite) => `
      <li>
        <a class="city sidenav-close waves-effect d-flex align-items-center pr-2" href="#">
          ${favorite.name} - ${favorite.uf}
          <button class="notification btn-flat orange-text ml-auto" title="Notificar Probabilidade de Chuva">
            <i class="material-icons font-size-1-6">${favorite.notificationOn ? 'notifications' : 'notifications_none'}</i>
          </button>
          <button class="remove btn-flat">
            <i class="material-icons">clear</i>
          </button>
        </a>
      </li>
    `).join('');
  }

  private get favoritesEmpty(): string {
    return `
      <div class="center px-3 py-4">
        <i class="material-icons grey-text text-lighten-1 font-size-3">place</i>
        <div class="mb-1 grey-text text-darken-1 font-weight-medium">Nenhum local favorito!</div>
        <div class="font-size-0-9 grey-text center">Adicione locais aos seus favoritos e eles aparecerão aqui.</div>
      </div>
    `;
  }
}
