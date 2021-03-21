import Router from '@koa/router';

export const router = new Router({
  prefix: '/livez',
});

router.get('/', (ctx, next) => {
  ctx.status = 204;
});
