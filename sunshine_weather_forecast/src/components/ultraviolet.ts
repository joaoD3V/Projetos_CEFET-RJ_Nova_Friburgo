import { Component, Store } from '../common/component';

export default class Ultraviolet extends Component {
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
            <div class="grey-text font-size-1-1 font-weight-medium mb-4 pb-2">Índice Ultravioleta</div>
            <div class="px-4">
              <div class="d-flex center font-size-0-9 grey-text">
                <div class="flex-grow-1">3</div>
                <div class="flex-grow-1">6</div>
                <div class="flex-grow-1">9</div>
                <div class="flex-grow-1">12</div>
              </div>
              <div class="progress mt-1 grey lighten-3" style="height: 8px;">
                <div class="determinate" style="${this.styleUltraviolet(data[params.key].ultraviolet)}"></div>
              </div>
            </div>
            <div class="center font-size-2 font-weight-medium">${data[params.key].ultraviolet}</div>
          </div>
        </div>
      `,
    });
  }

  private styleUltraviolet(ultraviolet: number): string {
    return `
      width: ${(ultraviolet * 100) / 14}%;
      background-color: ${this.ultravioletColor(ultraviolet)};
    `;
  }

  private ultravioletColor(ultraviolet: number): string {
    if (ultraviolet < 3) {
      return '#4caf50';
    }
    if (ultraviolet < 6) {
      return '#ffeb3b';
    }
    if (ultraviolet < 8) {
      return '#ff9800';
    }
    if (ultraviolet < 11) {
      return '#f44336';
    }
    return '#9c27b0';
  }
}
