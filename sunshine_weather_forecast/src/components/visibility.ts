import { Component, Store } from '../common/component';

export default class Visibility extends Component {
  constructor(params: {
    el: string;
    store: Store;
    key: string;
  }) {
    super({
      el: params.el,
      store: params.store,
      template: (data) => (data[params.key].wind.visibility ? `
        <div class="card">
          <div class="card-content p-4">
            <div class="grey-text font-size-1-1 font-weight-medium mb-4 pb-1">Visibilidade</div>
            <div class="center">
              <i class="material-icons orange-text font-size-3">remove_red_eye</i>
            </div>
            <div class="d-flex px-4">
              <div class="mb-2 font-size-1-6 font-weight-medium">${data[params.key].wind.visibility} Km/h</div>
            </div>
          </div>
        </div>
      ` : ''),
    });
  }
}
