const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mysql://root:wLwvrMApzIesReRtFMtlhSZcSxSkikju@autorack.proxy.rlwy.net:11626/railway", {
  host: "autorack.proxy.rlwy.net",
  port: 11626,
  dialect: "mysql",
  username: "root",
  password: "wLwvrMApzIesReRtFMtlhSZcSxSkikju",
  database: "railway"
})

module.exports = sequelize;