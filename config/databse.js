const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mysql://root:wLwvrMApzIesReRtFMtlhSZcSxSkikju@autorack.proxy.rlwy.net:11626/railway")

module.exports = sequelize;