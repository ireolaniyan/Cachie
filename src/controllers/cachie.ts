import { Request, Response, NextFunction } from 'express';
import { cacheSingleWords } from '../helpers/wordcache';

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