import { Component, Store } from '../common/component';
import icon from '../common/util/icon';

export default class Humidity extends Component {
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
            <div class="grey-text font-size-1-1 font-weight-medium mb-5">Humidade do ar</div>
            <div class="d-flex align-items-center mb-3 pb-3 pxs-0 px-4">
              <img class="mr-4" src="${icon('humidity')}" alt="Umidade" title="Umidade">
              <div class="font-size-2 font-weight-medium">${data[params.key].humidity}%</div>
            </div>
          </div>
        </div>
      `,
    });
  }
}
