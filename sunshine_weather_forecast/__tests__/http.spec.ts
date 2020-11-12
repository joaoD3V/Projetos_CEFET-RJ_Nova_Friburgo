import Http, { HttpError, HttpResponse } from '../src/http';

describe('Http queries', () => {
  it('should has a data', async () => {
    const response: HttpResponse = await Http.get(
      'http://servicos.cptec.inpe.br/XML/cidade/7dias/-22.90/-47.06/previsaoLatLon.xml',
    );
    expect(response.status).toBe(200);
    expect(response.data).not.toBeNull();
  });

  it('should throw an http error', async (done) => {
    try {
      await Http.get(
        'http://servicos.cptec.inpe.br/XML/cidade/7dias/00/00/previsaoLatLon.xml',
      );
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      return done();
    }
    return done('Not throw an http error');
  });
});
