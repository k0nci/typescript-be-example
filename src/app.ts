import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import middlewares from './middlewares';

// Routes
import { router as livez } from './routes/livez';

const NODE_ENV = process.env.NODE_ENV;

export const app = new Koa();

app.use(middlewares.reqLogger());
app.use(middlewares.error(NODE_ENV));

app.use(bodyParser({
  enableTypes: ['json'],
}));

app.use(livez.routes());

app.use(middlewares.notFound());
