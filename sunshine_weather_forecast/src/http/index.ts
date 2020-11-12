import axios, { AxiosResponse } from 'axios';

import HttpResponse from './http-response';
import HttpError from './http-error';

export { HttpResponse };
export { HttpError };

export default class Http {
  public static get(url: string, params?: any): Promise<HttpResponse> {
    return this.wrapAsync(() => axios.get(url, {
      params,
    }));
  }

  public static post(url: string, data: any): Promise<HttpResponse> {
    return this.wrapAsync(() => axios.post(url, data));
  }

  private static convertResponse(axiosResponse: AxiosResponse): HttpResponse {
    return new HttpResponse(axiosResponse.data, axiosResponse.status);
  }

  private static async wrapAsync(fn: () => Promise<AxiosResponse>): Promise<HttpResponse> {
    try {
      return this.convertResponse(await fn());
    } catch (error) {
      if (error.response) {
        throw new HttpError({
          message: error.response.data,
          status: error.response.status,
        });
      }
      throw new HttpError({
        message: error.message,
      });
    }
  }
}
