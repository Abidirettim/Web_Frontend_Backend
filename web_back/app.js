import dotenv from 'dotenv'
import bcryptjs from "bcryptjs"
import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import dbController from "./database/dbController.js"
import checkAuth from './middleware/check-auth.js'


const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

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
    return res.status(400).json({
      message: "Giriş Başarısız!"
    })
  }
})

app.post("/api/register", async (req, res) => {
  const new_user = {
    user: req.body.user,
    mail: req.body.mail,
    pass: hash,
  }
  const sql = "SELECT * FROM users WHERE user = ?"
  return dbController.dbControllerWithRequirements(sql, new_user.user).then(async (data) => {

    if (data.length) {
      return res.status(400).json({
        message: "Bu Kullanıcı Bulunmaktadır!"
      })
    }

    const hash = await bcryptjs.hash(req.body.pass, 8)

    const sql_1 = `INSERT INTO users (user, pass, mail) VALUES (?,?,?)`
    return dbController.dbControllerWithRequirements(sql_1, [new_user.user, new_user.pass, new_user.mail]).then(() => {

      return res.status(200).json({
        message: "Kayıt Başarılı."
      })
    })
  }).catch((err) => {
    return res.status(400).json({
      message: "Kayıt Başarısız!"
    })
  })
})

app.get("/api/posts/get", checkAuth, async (req, res) => {
  const sql = "SELECT * FROM articles;"
  return dbController.dbControllerWithoutRequirements(sql).then((data) => {
    res.status(200).json({
      message: "Makaleler Getirildi.",
      articles: data,
    })
  }).catch((err) => {
    return res.status(400).json({
      message: "Makaleler Getirilemedi!"
    })
  })
})
app.post("/api/posts/add", checkAuth, async (req, res) => {

  const post = {
    post_title: req.body.post_title,
    post_body: req.body.post_body,
    post_sender: req.body.post_sender,
    post_date: req.body.post_date,
  }

  const sql = "SELECT * FROM articles WHERE article_title = ?"
  return dbController.dbControllerWithRequirements(sql, post.post_title).then(async (data) => {
    if (data.length) {
      return res.status(400).json({
        message: "Bu Makale Bulunmaktadır!"
      })
    }

    const sql_1 = `INSERT INTO articles (article_title, article_body, article_sender, article_date) VALUES (?, ?, ?, ?)`
    return dbController.dbControllerWithRequirements(sql_1, [post.post_title, post.post_body, post.post_sender, post.post_date]).then(() => {

      return res.status(200).json({
        message: "Oluşturma Başarılı."
      })
    })
  }).catch((err) => {
    return res.status(400).json({
      message: "Oluşturma Başarısız!"
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