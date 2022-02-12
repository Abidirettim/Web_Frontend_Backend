import mysql from "mysql"

const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "test",
  database: "admin_bekir",
  /*host: process.env.DB_Host,
  user: process.env.DB_User,
  password: process.env.DB_Pass,
  database: process.env.DB,*/
})

db.connect((err) => {
  if (err) {
    console.log("db error!")

  }
  else {
    console.log("db succes!")
  }
})

export default db