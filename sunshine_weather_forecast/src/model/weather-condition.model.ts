export default class WeatherCondition {
  public description: string;
  public icon: string

  constructor(params: {
    description: string;
    icon: string;
  }) {
    this.description = params.description;
    this.icon = params.icon;
  }
}
