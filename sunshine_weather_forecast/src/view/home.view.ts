import { Component, Store } from '../common/component';
import Header from '../components/header';
import Loader from '../components/loader';
import Search from '../components/search';
import Sidenav from '../components/sidenav';
import Tabs from '../components/tabs';
import Weather from '../components/weather';
import WeatherItems from '../components/weather-items';
import City from '../model/city.model';

export default class Home extends Component {
  private onSearchChange: (data: City) => Promise<void>;

  constructor(params: {
    weather: Store,
    place: Store,
    loading: Store,
    onSearchChange: (data: City) => Promise<void>,
    onToggleFavorite: (city: City) => void,
    onToggleNotification: (city: City) => void,
  }) {
    super({
      el: '#app',
      template: () => `
        <div id="sidenav-wrapper"></div>
        <header id="header" class="hide-on-large-only"></header>
        <main>
          <div id="loader"></div>
          <div id="tabs"></div>
          <div id="cities"></div>
          <div id="search"></div>
        </main>
      `,
    });
    this.onSearchChange = params.onSearchChange;
    this.createComponents(
      params.weather,
      params.place,
      params.loading,
      params.onToggleFavorite,
      params.onToggleNotification,
    );
  }

  private async createComponents(
    weather: Store,
    place: Store,
    loading: Store,
    onToggleFavorite: (city: City) => void,
    onToggleNotification: (city: City) => void,
  ): Promise<void> {
    new Sidenav({
      el: '#sidenav-wrapper',
      store: place,
      onToggleFavorite,
      onToggleNotification,
      onPlaceChange: this.onSearchChange,
    });
    new Header({
      attachTo: this,
      el: '#header',
    });
    new Search({
      attachTo: this,
      el: '#search',
      onSearch: this.onSearchChange,
    });
    new Tabs({
      attachTo: this,
      el: '#tabs',
      tabs: [{
        title: 'Hoje',
        component: Weather,
        params: {
          store: weather,
          key: 'today',
        },
      }, {
        title: 'Amanhã',
        component: Weather,
        params: {
          store: weather,
          key: 'tomorrow',
        },
      }, {
        title: '7 Dias',
        component: WeatherItems,
        params: {
          store: weather,
          key: 'week',
        },
      }, {
        title: '14 Dias',
        component: WeatherItems,
        params: {
          store: weather,
          key: 'nextWeek',
        },
      }],
    });
    new Loader({
      store: loading,
      el: '#loader',
    });
  }
}
