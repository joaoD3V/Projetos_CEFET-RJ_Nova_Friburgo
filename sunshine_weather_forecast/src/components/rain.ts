import { Component, Store } from '../common/component';
import icon from '../common/util/icon';

export default class Rain extends Component {
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
            <div class="grey-text font-size-1-1 font-weight-medium mb-5">Chuva</div>
            <div class="d-flex align-items-center mb-4 px-4">
              <img class="mr-4" src="${icon('rain-2')}" alt="Chuva" title="Chuva">
              <div class="font-size-1-3 font-weight-medium">
                <div class="mb-1">${data[params.key].rain.probability}%</div>
                <div>${data[params.key].rain.volume}mm</div>
              </div>
            </div>
          </div>
        </div>
      `,
    });
  }
}
