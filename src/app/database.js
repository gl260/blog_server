const mysql = require("mysql2");

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "blog",
  user: "root",
  password: "Coderlgl.123",
  connectionLimit: 5,
});

// 2.获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 2.1判断是否有错误信息
  if (err) {
    console.log("获取数据路失败", err);
  }
  // 2.2获取connection,尝试和数据路简历连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库连接失败", err);
    } else {
      console.log("数据路连接成功~");
    }
  });
});

const connection = connectionPool.promise();
module.exports = connection;
