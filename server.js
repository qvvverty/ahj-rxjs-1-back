const http = require('http');
const Koa = require('koa');
// const koaBody = require('koa-body');

const port = process.env.PORT || 7070;

const app = new Koa();

const users = [];

// app.use(koaBody({
//   multipart: true,
// }));

app.use(async (ctx, next) => {
  ctx.response.set({
    // 'Access-Control-Allow-Origin': 'https://qvvverty.github.io',
    'Access-Control-Allow-Origin': '*',
  });
  await next();
});

app.use(async (ctx) => {
  if (!users.includes(ctx.request.body)) {
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(users);
    users.push(ctx.request.body);
  } else {
    ctx.response.status = 403;
  }
});

const server = http.createServer(app.callback());
server.listen(port, () => {
  console.log(`\x1b[33m> Server ready and listening on ${port}\x1b[0m`);
});
