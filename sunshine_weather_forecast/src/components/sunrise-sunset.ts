import { Component, Store } from '../common/component';
import dateToTime from '../common/util/date-to-time';
import icon from '../common/util/icon';

export default class SunriseSunset extends Component {
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
            <div class="grey-text font-size-1-1 font-weight-medium mb-4">Nascer e Pôr do Sol</div>
            <div class="d-flex align-items-center mb-3 px-4">
              <img class="mr-4" src="${icon('sunset')}" alt="Pôr do sol" title="Pôr do sol">
              <div class="font-size-1-1 font-weight-medium">${dateToTime(data[params.key].sun.sunset)}</div>
            </div>
            <div class="d-flex align-items-center px-4">
              <img class="mr-4" src="${icon('sunrise')}" alt="Nascer do sol" title="Nascer do sol">
              <div class="font-size-1-1 font-weight-medium">${dateToTime(data[params.key].sun.sunrise)}</div>
            </div>
          </div>
        </div>
      `,
    });
  }
}
