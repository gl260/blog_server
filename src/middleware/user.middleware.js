const UserService = require("../service/user.service");
const md5password = require("../utils/md5-password");

const verifyUser = async (ctx, next) => {
  // 2.验证客户端传过来的user是否可以保存到数据库中
  const { name, password } = ctx.request.body;
  // 2.1验证用户名和密码是否为空
  if (!name || !password) {
    ctx.body = {
      code: -1001,
      message: "用户名或者密码不能为空!",
    };
    return;
  }
  // 2.2判断name是否在数据库中已经存在了
  const users = await UserService.findUserByName(name);
  if (users.length) {
    ctx.body = {
      code: -1002,
      message: "用户名被占用!",
    };
    return;
  }

  await next();
};

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);

  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
