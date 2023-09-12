const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/user.router"); // 注册接口
const loginRouter = require("../router/login.router");

const app = new koa();

app.use(bodyParser()); // 用来解析json和urlencoded
app.use(userRouter.routes()); //让路由中的中间件生效
app.use(userRouter.allowedMethods()); // 提示没有封装的请求方式
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

module.exports = app;
