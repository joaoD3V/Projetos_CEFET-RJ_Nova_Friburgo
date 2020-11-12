export default class HttpError extends Error {
  public name: string = 'HttpError';
  public status?: number;

  constructor(args: {
    message: string;
    status?: number;
  }) {
    super(args.message);
    this.status = args.status;
  }
}
