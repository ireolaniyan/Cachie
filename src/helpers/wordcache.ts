import * as Cache from 'memory-cache';

const EXPIRY_TIME = 30 * 60 * 1000;       // 30 minutes

export function cacheSingleWords(query: string): void {
  const words = query.split(" ");

  words.forEach(word => {
    const cacheContainsWord = Cache.get(word.toLowerCase());

    if (!cacheContainsWord) {
      Cache.put(word.toLowerCase(), 1, EXPIRY_TIME);
    } else {
      Cache.put(word.toLowerCase(), 1 + cacheContainsWord, EXPIRY_TIME);
    }
  });
}

export function analyseToken(token: string): { result: object } {
  const values = token.split(",");
  const result: any = {};

  values.forEach(tokenValue => {
    const getWord = Cache.get(tokenValue.toLowerCase());
    result[tokenValue.toLowerCase()] = getWord ? getWord : 0;
  });

  // console.log({ result });
  
  return result;
}