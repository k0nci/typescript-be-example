import express from 'express';
import bodyParser from 'body-parser';
import middlewares from './utils/middlewares';

// Routes
import { router as healtz } from './routes/healtz';

const NODE_ENV = process.env.NODE_ENV;

export const app = express();

app.use(middlewares.reqLogger());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/healtz', healtz);

app.use(middlewares.notFound());

app.use(middlewares.error(NODE_ENV));
