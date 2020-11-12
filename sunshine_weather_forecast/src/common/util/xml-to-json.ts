import { Parser } from 'xml2js';

const xmlToJson = (xml: string) => new Parser({
  explicitArray: false,
  explicitRoot: false,
  explicitCharkey: false,
  explicitChildren: false,
  charsAsChildren: false,
  includeWhiteChars: false,
  ignoreAttrs: true,
  headless: true,
  trim: true,
}).parseStringPromise(xml);

export default xmlToJson;
