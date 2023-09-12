const koaRouter = require("@koa/router");
const UserService = require("../service/user.service");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

// 1.定义路由对象
const userRouter = new koaRouter({ prefix: "/users" });

// 2.定义路由映射

// 2.1 用户注册接口
userRouter.post("/", verifyUser, handlePassword, async (ctx, next) => {
  // 1.获取用户传过来的信息
  const user = ctx.request.body;

  // 2.将user信息存到数据库中
  const result = await UserService.create(user);

  // 3.查看存储解构,告诉前端创建成功
  ctx.body = {
    message: "创建用户成功",
    data: result,
  };
});

// 3.导出路由
module.exports = userRouter;
