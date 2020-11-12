import { Component, Store } from '../common/component';
import Humidity from './humidity';
import MinMax from './min-max';
import Rain from './rain';
import SunriseSunset from './sunrise-sunset';
import TemperatureInformation from './temperature-information';
import Ultraviolet from './ultraviolet';
import Visibility from './visibility';
import WeatherInformation from './weather-information';
import Wind from './wind';

export default class Weather extends Component {
  constructor(params: {
    el: string;
    attachTo: Component,
    store: Store,
    key: string,
  }) {
    super({
      el: params.el,
      attachTo: params.attachTo,
      template: () => `
        <div id="${params.key}-weather-informations"></div>
        <div id="${params.key}-temperature-information"></div>
        <div id="${params.key}-geolocation-information"></div>
        <div id="${params.key}-favorite"></div>
        <div class="px-3 mt-4 mb-2 font-size-1-3 grey-text text-darken-2">Detalhes</div>
        <div class="divider mb-3">Detalhes</div>
        <div class="details row">
          <div class="col s12 m4" id="${params.key}-temperature"></div>
          <div class="col s12 m4" id="${params.key}-wind"></div>
          <div class="col s12 m4" id="${params.key}-sunrise-sunset"></div>
        </div>
        <div class="details row">
          <div class="col s12 m4" id="${params.key}-ultraviolet"></div>
          <div class="col s12 m4" id="${params.key}-rain"></div>
          <div class="col s12 m4" id="${params.key}-humidity"></div>
        </div>
        <div class="details row">
          <div class="col s12 m4" id="${params.key}-visibility"></div>
        </div>
      `,
    });
    this.createWeatherInfos(params.key, params.store);
  }

  private createWeatherInfos(key: string, store: Store) {
    new WeatherInformation({
      el: `#${key}-weather-informations`,
      title: key === 'today' ? 'Hoje' : 'Amanhã',
      store,
      key,
    });
    new TemperatureInformation({
      el: `#${key}-temperature-information`,
      store,
      key,
    });
    new SunriseSunset({
      el: `#${key}-sunrise-sunset`,
      store,
      key,
    });
    new Wind({
      el: `#${key}-wind`,
      store,
      key,
    });
    new Humidity({
      el: `#${key}-humidity`,
      store,
      key,
    });
    new Ultraviolet({
      el: `#${key}-ultraviolet`,
      store,
      key,
    });
    new Rain({
      el: `#${key}-rain`,
      store,
      key,
    });
    new MinMax({
      el: `#${key}-temperature`,
      store,
      key,
    });
    new Visibility({
      el: `#${key}-visibility`,
      store,
      key,
    });
  }
}
