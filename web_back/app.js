import dotenv from 'dotenv'
dotenv.config()
import bcryptjs from "bcryptjs"
import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import dbController from "./database/dbController.js"
import checkAuth from './middleware/check-auth.js'


const app = express()

app.use(express.json())
app.use(cors())


app.post("/api/login", async (req, res) => {
  try {

    const sql = `SELECT user, pass FROM users WHERE user = ?`

    const data = await dbController.dbControllerWithRequirements(sql, [req.body.user])

    if (!data.length) {
      return res.status(400).json({
        message: "Kullanıcı Bulunamadı"
      })
    }

    const result = await bcryptjs.compare(req.body.pass, data[0].pass)

    if (!result) {
      return res.status(400).json({
        message: "Kullanıcı veya Parola Hatalı!"
      })
    }

    const token = jwt.sign({
      username: data[0].user
    }, process.env.JWT_KEY, { algorithm: "HS512", expiresIn: "1d" })

    return res.status(200).json({
      message: "Giriş Başarılı.",
      token: token
    })

  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: "Giriş Başarısız!"
    })
  }
})

app.post("/api/register", async (req, res) => {

  const sql = "select * from users where user = ?"
  return dbController.dbControllerWithRequirements(sql, req.body.user).then(async (data) => {

    if (data.length > 0) {
      return res.status(400).json({
        message: "Bu Kullanıcı Bulunmaktadır!"
      })
    }

    const hash = await bcryptjs.hash(req.body.pass, 8)

    const new_user = {
      user: req.body.user,
      mail: req.body.mail,
      pass: hash,
    }

    const sql_1 = `INSERT INTO users (user, pass, mail) VALUES (?,?,?)`
    return dbController.dbControllerWithRequirements(sql_1, [new_user.user, new_user.pass, new_user.mail]).then(() => {

      return res.status(200).json({
        message: "Kayıt Başarılı."
      })

    })
  }).catch((err) => {
    console.log(err)
    return res.status(400).json({
      message: "Kayıt Başarısız!"
    })
  })
})

app.post('/api/bekir', checkAuth, (req, res, next) => {

  const erdem = req.query.erdem
  return res.status(200).json(req.query)
})

app.post('/api/bekir/:id', (req, res, next) => { next() }, (req, res, next) => {

  const id = req.params.id
  return res.status(200).json({
    id: id
  })
})


app.use((req, res, next) => {

  const error = new Error('Not Found');
  error.status = 404;
  next(error);

})

app.use((err, req, res, next) => {

  res.status(err.status || 500);
  res.json({
    error: {
      message: err,
    }
  })
})

app.listen(3000, () => {
  console.log("Server On !")
})