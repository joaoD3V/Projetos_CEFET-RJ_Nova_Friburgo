import { Component } from '../common/component';

export default class Header extends Component {
  constructor(params: {
    attachTo: Component,
    el: string,
  }) {
    super({
      el: params.el,
      attachTo: params.attachTo,
      template: () => `
        <nav>
          <div class="nav-wrapper blue px-4">
            <a href="#" class="brand-logo">
              Sunshine
            </a>
            <a href="#" data-target="sidenav" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
          </div>
        </nav>
      `,
    });
  }
}
