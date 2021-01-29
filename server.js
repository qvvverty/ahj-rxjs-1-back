const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const Message = require('./Message');
// const koaBody = require('koa-body');

const port = process.env.PORT || 7070;
const app = new Koa();
const router = new Router();

// app.use(koaBody({
//   multipart: true,
// }));

app
  .use(async (ctx, next) => {
    ctx.response.set({
      // 'Access-Control-Allow-Origin': 'https://qvvverty.github.io',
      'Access-Control-Allow-Origin': '*',
    });
    await next();
  })
  .use(router.routes());

// app.use(async (ctx) => {
//   ctx.response.body = "I'm running";
// ctx.response.body = faker.lorem.sentences();
// ctx.response.body = uuidv4();

// if (!users.includes(ctx.request.body)) {
//   ctx.response.status = 200;
//   ctx.response.body = JSON.stringify(users);
//   users.push(ctx.request.body);
// } else {
//   ctx.response.status = 403;
// }
// });

router.get('/messages/unread', (ctx) => {
  // ctx.response.body = 'router working';
  ctx.response.body = JSON.stringify(new Message());
});

const server = http.createServer(app.callback());
server.listen(port, () => {
  console.log(`\x1b[33m> Server ready and listening on ${port}\x1b[0m`);
});
