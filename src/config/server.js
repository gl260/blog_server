// npm install dotenv 编写.env文件 通过dotenv加载配置的变量
const dotenv = require("dotenv");

dotenv.config();
// console.log(process.env); 从这里解构出来SERVER_PORT

module.exports = { SERVER_PORT } = process.env;
