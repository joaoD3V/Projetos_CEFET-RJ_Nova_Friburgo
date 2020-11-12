import HomeController from './controller/home.controller';

export default class App {
  public start(): void {
    new HomeController().initialize();
  }
}
