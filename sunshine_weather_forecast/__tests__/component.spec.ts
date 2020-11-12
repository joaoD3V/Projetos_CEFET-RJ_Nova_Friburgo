import { Component, Store } from '../src/common/component';

describe('Components and Store', () => {
  it('should be a reactive data', () => {
    const component = new Component({
      el: document.body,
      data: {
        list: [1, 2, 3, 4, 5],
      },
      template: () => `
        <button class="btn">more</button>
      `,
      setup: (element, data) => {
        const button = element.querySelector('.btn');
        button.addEventListener('click', () => data.list.push(6));
      },
    });
    component.render();
    const button: HTMLElement = document.querySelector('.btn');
    button.click();
    expect(component.data.list).toHaveLength(6);
  });

  it('should be a reactive store', async () => {
    const store = new Store({ list: [1, 2, 3, 4, 5] });
    new Component({
      el: document.body,
      store,
      template: () => `
        <button class="btn">more</button>
      `,
      setup: (element) => element.addEventListener('click', () => store.data.list.push(6)),
    })
      .render();
    const button: HTMLElement = document.querySelector('.btn');
    button.click();
    expect(store.data.list).toHaveLength(6);
  });
});
