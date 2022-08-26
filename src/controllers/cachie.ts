import { Request, Response, NextFunction } from 'express';
import { analyseToken, cacheSingleWords } from '../helpers/wordcache';

export async function search(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { search_query } = req.body;

  try {
    cacheSingleWords(search_query);
    
    return res.status(200).send({
      status: "ok",
    });
  } catch (error) {
    return next(error);
  }
}

export async function analyse(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { analysis_token } = req.query;
  
  try {
    const startTime = Date.now();

    const token: string = analysis_token ? analysis_token.toString() : "";
    const result = analyseToken(token);

    const endTime = Date.now();

    return res.status(200).send({
      results: result,
      time: `${endTime - startTime}ms`,
    });
  } catch (error) {
    return next(error);
  }
}