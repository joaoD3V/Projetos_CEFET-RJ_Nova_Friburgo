import { Tabs as MTabs } from 'materialize-css';

import { Component } from '../common/component';

interface Tab {
  component: typeof Component;
  title: string;
  params: any;
}

export default class Tabs extends Component {
  constructor(params: {
    attachTo: Component,
    el: string,
    tabs: Tab[],
  }) {
    super({
      el: params.el,
      attachTo: params.attachTo,
      template: () => `
        <ul id="tabs-swipe" class="tabs">
          ${params.tabs.map((tab, index) => `
            <li class="tab col l3">
              <a class="active text-blue" href="#tab-${index}">${tab.title}</a>
            </li>
          `).join('')}
        </ul>
        ${params.tabs.map((_, index) => `
          <div id="tab-${index}"></div>
        `).join('')}
      `,
      setup: (element) => {
        const tabs = element.querySelector('#tabs-swipe');
        MTabs.init(tabs);
      },
    });
    this.createTabs(params.tabs);
  }

  private createTabs(tabs: Tab[]): void {
    tabs.forEach((tab, index) => {
      const TabComponent = tab.component;
      new TabComponent({
        attachTo: this,
        el: `#tab-${index}`,
        ...tab.params,
      });
    });
  }
}
