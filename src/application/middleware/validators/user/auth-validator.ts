import { AppException } from '@domain/exceptions';
import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi, { ValidationError } from 'joi';

const authSchema = Joi.object({
  cpf: Joi.string().min(3).max(11).required(),
  senha: Joi.string().min(3).required(),
});

export const authValidator: RequestHandler = async (req, _res, next): Promise<void> => {
  try {
    await authSchema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new AppException({
        errorCode: 'REQ001',
        statusCode: UNPROCESSABLE_ENTITY,
        message: err.message,
      });
    }
  }
};
