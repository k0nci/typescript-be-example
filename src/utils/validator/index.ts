import ajv, { Schema, SchemaObject } from 'ajv';
import { RequestHandler } from 'express';
import { ValidationError } from '../errors/ValidationError';
import { parseErrors } from './errorUtils';

export type IRequestSchema = {
  query?: Schema;
  params?: Schema;
  body?: Schema;
  headers?: Schema;
};

const defaultReqSchema: Readonly<SchemaObject> = {
  type: 'object',
  properties: {
    query: { }, // Empty schema acts as any
    params: { },
    body: { },
    headers: { },
  },
};

export class Validator {
  // TODO: Remove singleton?
  private static instance: Validator;

  private ajv: ajv;

  private constructor() {
    // TODO: Add ability to change config
    // TODO: Add ability to define custom keywords
    this.ajv = new ajv({
      allErrors: true,
      coerceTypes: true,
      messages: false,
      useDefaults: true,
    });
  }

  public static getInstance(): Validator {
    if (!Validator.instance) {
      Validator.instance = new Validator();
    }

    return Validator.instance;
  }

  public middleware(schema: IRequestSchema): RequestHandler {
    const reqSchema = {
      ...defaultReqSchema,
      properties: {
        query: schema.query || defaultReqSchema.properties.query,
        params: schema.params || defaultReqSchema.properties.params,
        body: schema.body || defaultReqSchema.properties.body,
        headers: schema.headers || defaultReqSchema.properties.headers,
      },
    };
    // Compile schema to validate function
    const validateFunction = this.ajv.compile(reqSchema);

    return (req, res, next) => {
      const reqData = {
        query: req.query,
        params: req.params,
        body: req.body,
        headers: req.headers,
      };

      // Validate request data
      validateFunction(reqData);
      // Get errors from validate function
      const errors = validateFunction.errors || [];
      const validationErrors = parseErrors(errors);

      if (validationErrors.length !== 0) {
        const err = new ValidationError();
        return next(err);
      }
      return next();
    };
  }

}
