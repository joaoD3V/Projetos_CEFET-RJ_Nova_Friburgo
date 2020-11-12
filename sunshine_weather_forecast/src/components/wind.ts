import { Component, Store } from '../common/component';
import WindInfo from '../model/wind-info.model';

export default class Wind extends Component {
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
            <div class="grey-text font-size-1-1 font-weight-medium mb-4">Vento</div>
            <div class="mb-3 font-size-1-6 font-weight-medium px-4">${data[params.key].wind.speed.toFixed(2)} Km/h</div>
            <div class="d-flex align-items-center px-4">
              <div class="wind-direction" style="${this.windRotate(data[params.key].wind)}">
                <i class="material-icons blue-text">place</i>
              </div>
              <div class="ml-3 font-size-1-3 font-weight-medium">${data[params.key].wind.direction}</div>
            </div>
          </div>
        </div>
      `,
    });
  }

  private windRotate(data: WindInfo): string {
    return `
      transform: rotate(${180 + data.degrees}deg);
    `;
  }
}
