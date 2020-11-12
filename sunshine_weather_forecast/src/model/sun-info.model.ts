export default class SunInfo {
  public sunrise: Date;
  public sunset: Date;

  constructor(params: {
    sunrise: Date;
    sunset: Date;
  }) {
    this.sunrise = params.sunrise;
    this.sunset = params.sunset;
  }
}
