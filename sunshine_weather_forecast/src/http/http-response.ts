export default class HttpResponse {
  public data: any;
  public status: number;

  constructor(data: any, status: number) {
    this.data = data;
    this.status = status;
  }
}
