import { FloatingActionButton } from 'materialize-css';
import { Component, Store } from '../common/component';
import debounce from '../common/util/debounce';
import City from '../model/city.model';
import GeolocationService from '../service/geolocation.service';

export default class Search extends Component {
  private citiesStore: Store;
  private searchInput: HTMLInputElement;
  private onSearch: (city: City) => void;

  constructor(params: {
    attachTo: Component,
    el: string,
    onSearch: (city: City) => void,
  }) {
    super({
      el: params.el,
      attachTo: params.attachTo,
      template: () => `
        <div id="options"></div>
        <div class="fixed-action-btn toolbar">
          <a class="btn-floating btn-large orange">
            <i class="large material-icons">search</i>
          </a>
          <ul>
            <li>
            <nav class="orange">
              <div class="nav-wrapper">
                <div class="input-field">
                  <input id="search-city" type="search" required>
                  <label class="label-icon" for="search-city">
                    <i class="material-icons">search</i>
                  </label>
                  <i class="material-icons">close</i>
                </div>
              </div>
              </nav>
            </li>
          </ul>
        </div>
      `,
      setup: (element) => {
        this.preventDefaultClick(element);
        this.setupFloatBtn(element);
        this.setupOnSearch(element);
      },
    });
    this.citiesStore = new Store({
      cities: [],
    });
    this.onSearch = params.onSearch;
    this.createOptionsComponent();
  }

  private createOptionsComponent(): void {
    new Component({
      el: '#options',
      attachTo: this,
      store: this.citiesStore,
      template: (data: { cities: City[] }) => `
        <div class="card blue-grey darken-1 ${data.cities.length ? 'active' : ''}">
          <div class="card-content white-text p-3">
            <span class="card-title center">
              Cidades
              <a href class="close white-text">
                <i class="material-icons">close</i>
              </a>
            </span>
            <div class="divider"></div>
            <ul>
              ${data.cities.map((city) => `
                <li class="py-1">
                  <a href class="city white-text">${city.name} - ${city.uf}</a>
                </li>`).join('')}
            </ul>
          </div>
        </div>
      `,
      setup: (element) => {
        const close = element.querySelector('.close');
        close.addEventListener('click', (event: any) => {
          event.preventDefault();
          this.clearSearch();
        });
        const list = element.querySelectorAll('.city');
        list.forEach((value, index) => {
          value.addEventListener('click', (event: any) => {
            event.preventDefault();
            const city: City = this.citiesStore.data.cities[index];
            this.onSearch(city);
            this.clearSearch();
          });
        });
      },
    });
  }

  private clearSearch(): void {
    this.citiesStore.data.cities = [];
    this.searchInput.value = '';
  }

  private search = async (): Promise<void> => {
    const text: string = this.searchInput.value.trim();
    if (!text || text.length < 3) {
      return;
    }
    const cities = await GeolocationService.searchCity(text);
    this.citiesStore.data.cities = cities;
  }

  private preventDefaultClick(element: Element): void {
    const li = element.querySelector('li');
    li.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }

  private setupFloatBtn(element: Element): void {
    const floatBtn = element.querySelector('.fixed-action-btn');
    FloatingActionButton.init(floatBtn, {
      toolbarEnabled: true,
    });
  }

  private setupOnSearch(element: Element): void {
    this.searchInput = element.querySelector('#search-city');
    this.searchInput.addEventListener('input', debounce(this.search));
  }
}
