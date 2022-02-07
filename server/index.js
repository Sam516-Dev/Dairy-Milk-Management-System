const express = require('express')
const mysql = require('mysql')
var cors = require('cors')
const app = express()
const port = 3001

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

//cors- Cross-Origin Resource Sharing
// app.use(
//   cors({
//     origin: ['http://localhost:3000'],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   }),
// )

app.use(cors())
app.use(express.json())

// creating database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sam',
  password: 'password',
  database: 'dairy-milk-db',
})

app.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  console.log(req.body)

  db.query(
    'INSERT INTO admin (username, password) VALUES (?,?)',
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('values inserted to the database')
      }
    },
  )
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})

//login route
app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.query(
    //'SELECT * FROM admin n WHERE username = ? AND password = ?',
    'SELECT username, password FROM admin WHERE username = ? AND password = ?'[
      (username, password)
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }

      if (result.length > 0) {
        res.send(result)
      } else ({ message: 'Wrong username/password comination!' })
    },
  )
  res.send(`Username: ${username} Password: ${password}`)
})

//......was a test, delete this
// app.post('/login', (req, res) => {
//   db.query('SELECT * FROM admin ', (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.send(result)
//     }
//   })
// })
