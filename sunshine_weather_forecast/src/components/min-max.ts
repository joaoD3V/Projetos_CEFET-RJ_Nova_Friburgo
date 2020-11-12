import { Component, Store } from '../common/component';
import icon from '../common/util/icon';

export default class MinMax extends Component {
  constructor(params: {
    el: string;
    store: Store;
    key: string;
  }) {
    super({
      el: params.el,
      store: params.store,
      template: (data) => `
        <div class="card">
          <div class="card-content p-4">
            <div class="grey-text font-size-1-1 font-weight-medium mb-4">Temperatura</div>
            <div class="d-flex align-items-center px-4 mb-4">
              <img class="mr-4 small" src="${icon('max')}" alt="Máxima" title="Máxima">
              <div class="red-text text-darken-1 font-size-1-3 font-weight-medium">${data[params.key].temperature.maximum}°C</div>
            </div>
            <div class="d-flex align-items-center px-4">
              <img class="mr-4 small" src="${icon('min')}" alt="Mínima" title="Mínima">
              <div class="blue-text text-darken-1 font-size-1-3 font-weight-medium">${data[params.key].temperature.minimum}°C</div>
            </div>
          </div>
        </div>
      `,
    });
  }
}
