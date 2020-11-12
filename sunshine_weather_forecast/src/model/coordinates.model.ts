export default class Coordinates {
  public latitude: number;
  public longitude: number;

  constructor(params: {
    latitude: number;
    longitude: number;
  }) {
    this.latitude = params.latitude;
    this.longitude = params.longitude;
  }
}
