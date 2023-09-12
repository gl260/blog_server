const UserService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../config/keys");

const verifyUser = async (ctx, next) => {
  // 1.判断用户账号密码是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    ctx.body = {
      code: -1001,
      message: "用户名或者密码不能为空!",
    };
    return;
  }

  // 2.判断用户名是否存在于数据库
  const users = await UserService.findUserByName(name);
  const user = users[0];
  if (!user) {
    ctx.body = {
      code: -1003,
      message: "用户名不存在!!!",
    };
    return;
  }

  // 3.数据库中的密码是否和用户输入的密码一致
  if (user.password != md5password(password)) {
    ctx.body = {
      code: -1004,
      message: "密码错误!!!",
    };
    return;
  }

  // 4.保存user对象在ctx中
  ctx.user = user;

  await next();
};

const verifyAuto = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    ctx.body = {
      code: -1005,
      message: "无效token!!!",
    };
    return;
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token是否有效
  try {
    // 2.1获取token中的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    // 2.2将token中的信息保存小来
    ctx.user = result;

    await next();
  } catch (error) {
    ctx.body = {
      code: -1005,
      message: "无效token!!!",
    };
    return;
  }
};

module.exports = {
  verifyUser,
  verifyAuto,
};
