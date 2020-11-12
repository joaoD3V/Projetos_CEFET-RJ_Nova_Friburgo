import { Component, Store } from '../common/component';
import icon from '../common/util/icon';

export default class Loader extends Component {
  constructor(params: {
    store: Store,
    el: string
  }) {
    super({
      el: params.el,
      store: params.store,
      template: (data) => (data.isLoading ? `
        <div class="loader">
          <div class="center">
            <img src="${icon('loader')}"></img>
            <div class="grey-text text-darken-3 font-weight-medium font-size-1-5">Olhando o tempo lá fora...</div>
            <div class="grey-text text-darken-3 font-size-1-1">Aguarde</div>
          </div>
        </div>
      ` : ''),
    });
  }
}
