const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = 3001

//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
)

//app.use(cors())... cross origin resource sharing
app.use(express.json())

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//for hashing passwords
const bcrypt = require('bcrypt')
//defines the number of hashing rounds is done during the bcrypt hashing
const saltRound = 10

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    key: 'userId',
    secret: 'subscribe',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  }),
)

//get method here.. route
app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }
})

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
  // console.log('this is the registration filed')
  // //check if the user exists
  // const oldUser = username.findOne(username)

  // if (oldUser) {
  //   res.status(409).send('User Already Exist. Please Login')
  //   console.log('old user exists ')
  // }
  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      return console.log(err)
    }
    db.query(
      'INSERT INTO admin (username, password) VALUES (?,?)',
      [username, hash],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send('values inserted to the database')
        }
      },
    )
  })
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  //check if the input field are empty...
  // if (!(username && password)) {
  //   return res.status(400).send('All input is required')
  // }

  db.query(
    'SELECT * FROM admin WHERE username = ?;',
    [username],
    (err, result) => {
      if (err) {
        return res.send({ err: err })
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result
            console.log(req.session.user)
            return res.send(result)
          } else {
            return res.send({
              message: 'Wrong username / password comination!',
            })
          }
        })
      } else {
        res.send({ message: "User doesn't exists" })
      }
    },
  )
})

//inserting deliveries in the database
app.post('/adddelivery', (req, res) => {
  const fullName = req.body.fullName
  const quantity = req.body.quantity
  const date = req.body.date
  const farmersId = req.body.farmersID
  console.log(fullName + quantity + date + farmersId)
  db.query(
    `INSERT INTO deliveries (farmersId, fullName, quantity, date) VALUES ( "${farmersId}", "${fullName}", "${quantity}", "${date}")`,
    [(farmersId, fullName, quantity, date)],

    (err, result) => {
      if (err) {
        console.log(err)
        console.log(fullName + quantity + date + farmersId)
      } else {
        console.log('values inserted in the database successifully ')
      }
    },
  )
  res.send({ message: 'values inserted in the database' })
})

//tying to fetch deliveries
app.get('/fetchalldeliveries', (req, res) => {
  db.query('SELECT * FROM deliveries;', (err, results) => {
    if (err) {
      return res.send({ err: err })
    } else {
      res.send(results)
      //console.log(results)
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})


//API for adding/put/update deliveries that are already in the database
//app.put()



//an Api for deleting deliveries contents in the database
//app.delete()



