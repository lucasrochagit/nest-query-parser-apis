import { Injectable } from '@nestjs/common';

type Options = {
  ignoreFromSource?: string[];
};

@Injectable()
export class Serializer<Source, Target> {
  public serialize(source: Source, opt?: Options): Target {
    const result: Target = {} as Target;
    const { ignoreFromSource = [] } = opt ?? {};

    const source_keys: string[] = Object.keys(source);
    return source_keys.reduce((obj, key) => {
      if (!!source[key] && ignoreFromSource.indexOf(key) === -1) {
        obj[key] = source[key];
      }
      return obj;
    }, result);
  }
}