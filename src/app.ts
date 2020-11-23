import express from 'express';
import bodyParser from 'body-parser';
import { NodeEnv } from './types';
import middlewares from './utils/middlewares';

// Routes
import { router as healtz } from './routes/healtz';

const NODE_ENV = process.env.NODE_ENV as NodeEnv;

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/healtz', healtz);

app.use(middlewares.notFound());

app.use(middlewares.error(NODE_ENV));
