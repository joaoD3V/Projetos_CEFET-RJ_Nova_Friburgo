import Store from './store';

interface ComponentOptions {
  el?: string | Element;
  data?: any;
  attachTo?: Component | Component[];
  isStore?: boolean;
  store?: Store;
  template?: (props: any) => string;
  setup?: (element: Element, data: any) => void;
}

export default class Component {
  private el: string | Element;
  private element: Element;
  private props: any;
  private store: Store;
  private attached: Component[];
  private isStore: boolean;
  private template: (props: any) => string;
  private setup: (element: Element, data: any) => void;
  private debounce: number;

  constructor(options: ComponentOptions) {
    if (options.data) {
      this.props = new Proxy(options.data, this.makeProxy());
    }
    this.attached = [];
    this.isStore = options.isStore;
    if (!this.isStore) {
      this.el = options.el;
      this.template = options.template;
      if (options.attachTo) {
        const attachTo: Component[] = [].concat(options.attachTo);
        attachTo.forEach((view) => {
          view.attach(this);
        });
      }
      if (options.setup) {
        this.setup = options.setup;
      }
      this.setupInit();
    }
    if (options.store) {
      this.store = options.store;
      this.store.attach(this);
    }
  }

  public attach(view: Component | Component[]): void {
    if (Array.isArray(view)) {
      this.attached.push(...view);
    } else {
      this.attached.push(view);
    }
  }

  private debounceRender(): void {
    if (this.debounce) {
      window.cancelAnimationFrame(this.debounce);
    }
    this.debounce = window.requestAnimationFrame(() => {
      this.render();
    });
  }

  public render(): void {
    if (this.isStore) {
      this.renderAttached();
      return;
    }
    if (!this.element) {
      this.setupInit();
    }
    const data: any = this.store ? this.store.data : this.data;
    this.element.innerHTML = this.template(data);
    if (this.setup && this.element) {
      this.setup(this.element, data);
    }
    this.renderAttached();
  }

  public get data(): any {
    return this.props;
  }

  public set data(data: any) {
    this.props = new Proxy(data, this.makeProxy());
    this.debounceRender();
  }

  private renderAttached(): void {
    this.attached.forEach((view) => {
      view.render();
    });
  }

  private setupInit(): void {
    if (!this.el) {
      return;
    }
    this.element = typeof this.el === 'string'
      ? document.querySelector(this.el)
      : this.el;
  }

  private makeProxy(): ProxyHandler<any> {
    return {
      get: (obj, prop) => {
        if (this.isObject(obj[prop])) {
          return new Proxy(obj[prop], this.makeProxy());
        }
        return obj[prop];
      },
      set: (obj, prop, value) => {
        if (obj[prop] === value) {
          return true;
        }
        obj[prop] = value;
        this.debounceRender();
        return true;
      },
    };
  }

  private isObject(prop: any): boolean {
    return ['object', 'array'].indexOf(
      Object.prototype.toString.call(prop).slice(8, -1).toLowerCase(),
    ) > -1;
  }
}
