import express from 'express';
import { NodeEnv } from './util';
import middlewares from './util/middlewares';

const NODE_ENV = process.env.NODE_ENV as NodeEnv;

export const app = express();

app.get('/', (req, res, next) => {

});

app.use(middlewares.notFound());

app.use(middlewares.error(NODE_ENV));
