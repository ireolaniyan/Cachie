import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export async function validateSearchCachie(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const schema = Joi.object()
    .keys({
      search_query: Joi.string().required(),
    })
    .unknown(false);

  const validation = schema.validate(req.body);

  if (validation.error) {
    const error = validation.error.message
      ? validation.error.message
      : validation.error.details[0].message;

    return res.status(400).send({
      error,
    });
  }

  return next();
}

export async function validateAnalyseToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const schema = Joi.object()
    .keys({
      analysis_token: Joi.string().required(),
    })
    .unknown(false);

  const validation = schema.validate(req.query);

  if (validation.error) {
    const error = validation.error.message
      ? validation.error.message
      : validation.error.details[0].message;

    return res.status(400).send({
      error,
    });
  }

  return next();
}