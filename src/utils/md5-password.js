// cryto是node中内置的 用来加密的库
const cryto = require("crypto");

function md5password(password) {
  // 1.创建一个md5的加密算法
  const md5 = cryto.createHash("md5");
  // 2.update将我们传入的数据经过md5的算法生成值 返回的是二进制hash值
  // digest("hex") -> 转成16进制的
  const md5pwd = md5.update(password).digest("hex");
  return md5pwd;
}

module.exports = md5password;
