import Component from './component';

export default class Store extends Component {
  constructor(data: any) {
    super({
      isStore: true,
      data,
    });
  }
}
