export default class RainInfo {
  public probability: number;
  public volume: number;

  constructor(params: {
    probability: number;
    volume: number;
  }) {
    this.probability = params.probability;
    this.volume = params.volume;
  }
}
