import * as Cache from 'memory-cache';

const EXPIRY_TIME = 30 * 60 * 1000;       // 30 seconds

export function cacheSingleWords(query: string) {
  const words = query.split(" ");

  words.forEach(word => {
    const cacheContainsWord = Cache.get(word.toLowerCase());

    // console.log({ word: word.toLowerCase(), cacheContainsWord });
    
    if (!cacheContainsWord) {
      Cache.put(word.toLowerCase(), 1, EXPIRY_TIME);
    } else {
      Cache.put(word.toLowerCase(), 1 + cacheContainsWord, EXPIRY_TIME);
    }
    
  });
}