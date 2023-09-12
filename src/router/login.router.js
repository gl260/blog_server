const koaRouter = require("@koa/router");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/keys");
const { verifyUser, verifyAuto } = require("../middleware/login.middleware");

const loginRouter = new koaRouter({ prefix: "/login" });

loginRouter.post("/", verifyUser, (ctx, next) => {
  // 1.获取用户信息
  const { id, name } = ctx.user;

  // 2.颁发令牌token expiresIn:设置过期时间  algorithm:设置算法 -> RS256(非对称加密算法) 默认是HS256
  const token = jwt.sign({ id, name }, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: "RS256",
  });

  // 3.返回用户信息
  ctx.body = { code: 0, data: { id, name, token } };
});

// 测试token
loginRouter.get("/test", verifyAuto, (ctx, next) => {
  ctx.body = `可以登录login/test接口`;
});

module.exports = loginRouter;
