import { Component, Store } from '../common/component';

export default class TemperatureInformation extends Component {
  constructor(params: {
    el: string,
    store: Store,
    key: string,
  }) {
    super({
      el: params.el,
      store: params.store,
      template: (data) => `
        <div class="row mb-0" id="temperature-content">
          <div class="col s3 l1 offset-s4 offset-l5 center" id="temperature">
            <h1>${data[params.key].temperature.maximum}</h1>
          </div>
          <div class="col s2 l1" id="temperature-type">
            <h6>°C</h6>
          </div>
        </div>
      `,
    });
  }
}
