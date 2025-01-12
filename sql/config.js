const mysql = require("mysql2")

async function MySql(){
  // mysql://root:wLwvrMApzIesReRtFMtlhSZcSxSkikju@autorack.proxy.rlwy.net:11626/railway
  const connection = mysql.createPool({
    host: "autorack.proxy.rlwy.net",
    user: "root",
    password: "wLwvrMApzIesReRtFMtlhSZcSxSkikju",
    database: "railway",
    port: 11626
  })

  const pool = connection.promise()

  return pool
}

module.exports = MySql