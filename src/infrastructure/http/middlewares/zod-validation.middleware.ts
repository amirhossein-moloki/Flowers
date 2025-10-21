import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate =
  (schema: z.AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.flatten().fieldErrors,
        });
      }
      return res.status(400).json(error);
    }
  };
