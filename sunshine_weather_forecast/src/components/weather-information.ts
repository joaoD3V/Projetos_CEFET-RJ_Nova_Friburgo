import { Component, Store } from '../common/component';
import dateToString from '../common/util/date-to-string';
import icon from '../common/util/icon';

export default class WeatherInformation extends Component {
  constructor(params: {
    el: string,
    store: Store,
    key: string,
    title: string,
   }) {
    super({
      el: params.el,
      store: params.store,
      template: (data) => `
        <div class="row mb-0" id="weather-content">
          <div class="col s4 l2 offset-m2 offset-l4">
            <div id="weather-icon">
              <img src="${icon(data[params.key].condition.icon)}" alt="${data[params.key].condition.description}" title="${data[params.key].condition.description}">
            </div>
          </div>
          <div class="col s8 m6" id="date-content">
            <h3>${params.title}</h3>
            <div class="row">
              <div class="col s12">
                <h6>${dateToString(data[params.key].day)}</h6>
              </div>
            </div>
          </div>
        </div>
      `,
    });
  }
}
