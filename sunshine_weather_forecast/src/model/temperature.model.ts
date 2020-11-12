export default class Temperature {
  public minimum: number;
  public maximum: number;

  constructor(params: {
    minimum: number;
    maximum: number;
  }) {
    this.minimum = params.minimum;
    this.maximum = params.maximum;
  }
}
