export default class WindInfo {
  public speed: number;
  public direction: string;
  public degrees: number;

  constructor(params: {
    speed: number;
    degrees: number;
    direction: string;
  }) {
    this.speed = params.speed;
    this.direction = params.direction;
    this.degrees = params.degrees;
  }
}
