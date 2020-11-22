import express from 'express';
import { NodeEnv } from './util';
import middlewares from './util/middlewares';

// Routes
import { router as healtz } from './routes/healtz';

const NODE_ENV = process.env.NODE_ENV as NodeEnv;

export const app = express();

app.use('/healtz', healtz);

app.use(middlewares.notFound());

app.use(middlewares.error(NODE_ENV));
