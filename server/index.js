const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = 3001
const path = require('path')

app.use(cors())
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(
  cors({
    // origin: ['http://localhost:3000'],
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
  }),
)
app.use(cors({ credentials: true }))
// ... cross origin resource sharing

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

// Enable CORS>> added
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested With, Content-Type, Accept',
  )
  next()
})

//get method here.. route
// app.get('/login', (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user })
//     console.log(req.session.user);
//   } else {
//     res.send({ loggedIn: false })
//   }
// })

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
  //  const oldUser = username.findOne(username)

  //  if (oldUser) {
  //   res.status(409).send('User Already Exist. Please Login')
  //    console.log('old user exists ')
  //  }
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

///inserting dairy milk in the database from the +NEW route
app.post('/adddairymilk', (req, res) => {
  const fullName = req.body.fullName
  const quantity = req.body.quantity
  const date = req.body.date
  const farmersID = req.body.farmersID
  console.log(fullName + quantity + farmersID)
  db.query(
    `INSERT INTO dairymilk (farmersID, fullName, quantity,date) VALUES ( "${farmersID}", "${fullName}", "${quantity}","${date}")`,
    [(farmersID, fullName, quantity, date)],

    (err, result) => {
      if (err) {
        console.log(err)
        console.log(fullName + quantity + farmersID + date)
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

//app.delete('/delete/:id', (req, res) => {
//how the user will view based on their farmersID
//'SELECT * FROM admin WHERE username = ?;',
app.get('/View/:id', (req, res) => {
  const farmersID = req.params.id
  console.log(req.params.id)

  db.query(
    'SELECT * FROM dairymilk WHERE farmersid = ?',
    farmersID,
    (err, results) => {
      if (err) {
        return res.send({ err: err })
      } else {
        res.send(results)
        console.log('data queried successifully ')
      }
    },
  )
})

//tying to fetch alldeliveries
app.get('/ViewAllDeliveries', (req, res) => {
  db.query('SELECT * FROM dairymilk;', (err, results) => {
    if (err) {
      return res.send({ err: err })
    } else {
      res.send(results)
      //console.log(results)
    }
  })
})

//tying to fetch MilkPrice
app.get('/getMilkPrice', (req, res) => {
  db.query('SELECT dbprice FROM priceperlitre;', (err, results) => {
    if (err) {
      return res.send({ err: err })
    } else {
      res.send(results)
      console.log('database price', results)
    }
  })
})

//this is a login route or end point
// app.post('/login', (req, res) => {
//   const FullName = req.body.FullName
//   const Password = req.body.Password
//   db.query(
//     'SELECT * FROM deliveries WHERE FullName = ? AND Password = ?',
//     [FullName, Password],
//     (err, result) => {
//       if (err) {
//         return res.send({ err: err })
//       }
//       if (result.length > 0) {
//         bcrypt.compare(Password, result[0].Password, (error, response) => {
//           if (result) {
//             //  res.send(response)
//             // console.log('response', response );
//             // req.session.user = result
//             // console.log(req.session.user)
//             res.send(result)
//             console.log('result', result)
//           } else {
//            res.send({
//               message: 'Wrong username / password combination!',
//             })
//           }
//         })
//       } else {
//         res.send({ message: "User doesn't exists" })
//       }
//     },
//   )
// })

app.post('/login', (req, res) => {
  const FullName = req.body.FullName
  const Password = req.body.Password

  db.query(
    'SELECT * FROM deliveries WHERE FullName = ?;',
    FullName,
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } else if (FullName === '') {
        res.status(400).send({
        msg: 'Please pass Role ID, email, password, phone or fullname.'
      })
      } else if (Password === '') {
        res.send({ success: false, message: 'password required' })
      } else if (result.length > 0) {
        bcrypt.compare(Password, result[0].Password, (error, response) => {
          if (response) {
            //res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            req.session.user = result
            console.log('session print', req.session.user)
            res.send(result)
            console.log('result', result)
          } else {
            res.send({ message: 'Wrong username/password combination!' })
          }
        })
      } else {
        res.send({ message: "User doesn't exist" })
      }
    },
  )
})

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }
})

//inserting milk price in the database
// app.post('/InputPrice', (req, res) => {
//   const price = req.body.price
//   console.log(`this is the price ${price}`)
//   db.query(
//     `INSERT INTO priceperlitre (price) VALUES ( "${price}")`,
//     [(price)],

//     (err, result) => {
//       if (err) {
//         console.log(err)
//         console.log(price)
//       } else {
//         console.log('price inserted in the database successifully ')
//       }
//     },
//   )
//   res.send({ message: 'values inserted in the database' })
// })
//update price
app.put('/UpdateMilkPrice/:priceUpdated', (req, res) => {
  const price = req.body.price
  console.log(`price coming to the backened is ${price}`)
  db.query(
    `UPDATE priceperlitre  SET  ? `,
    [{ dbprice: price }],

    (err, result) => {
      if (err) {
        console.log(err)
        console.log(`price coming to the backened are this ${price}`)
      } else {
        console.log('price UPDATED in the database successifully ')
      }
    },
  )
  res.send({ message: 'values updated in the database' })
})

//this is the route for deleting deliveries from the backened
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM deliveries WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

//this is the route for deleting on the view component
app.delete('/deleteuser/:farmersID', (req, res) => {
  const farmersid = req.params.farmersID
  console.log(farmersid)
  db.query(
    'DELETE FROM dairymilk WHERE farmersid = ?',
    farmersid,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        console.log('deleted successifully !')
      }
    },
  )
})

//inserting a new famrmer in the deliveries database
app.post('/addfarmer', (req, res) => {
  const fullName = req.body.fullName
  const quantity = req.body.quantity
  const date = req.body.date
  const farmersID = req.body.farmersID
  const Password = req.body.Password
  console.log(fullName + quantity + farmersID + Password)

  bcrypt.hash(Password, saltRound, (err, hash) => {
    db.query(
      `INSERT INTO deliveries (farmersID, fullName, quantity,date,Password) VALUES ( "${farmersID}", "${fullName}", "${quantity}","${date}", ? )`,
      // `INSERT INTO deliveries (farmersID, fullName, quantity,date,Password) VALUES ( ?, ?, ?, ?, ?)`,

      // 'INSERT INTO admin (username, password) VALUES (?,?)',
      [(farmersID, fullName, quantity, date, hash)],

      (err, result) => {
        if (err) {
          console.log(err)
          console.log(fullName + quantity + farmersID + date + hash)
        } else {
          console.log('new farmer added !')
        }
      },
    )
  })

  res.send({ message: 'values inserted in the database' })
})

//this route is used to update the user through the use of ID
//API for adding/put/update deliveries that are already in the database
app.put('/Update', (req, res) => {
  const fullName = req.body.fullName
  const quantity = req.body.quantity
  //const date = req.body.date
  const farmersID = req.body.farmersID
  const id = req.body.id
  const Role = req.body.Role
  console.log(
    `values coming to the backened are this ${
      fullName + quantity + farmersID + id + Role
    }`,
  )
  if (!fullName || !quantity || !Role) {
    res.send({ message: 'All values required !' })
  } else {
  db.query(
    `UPDATE deliveries  SET ? WHERE id=?`,
    [{ farmersid: farmersID, fullName, quantity, Role }, id],

    (err, result) => {
      if (err) {
        console.log(err)
        console.log(
          `values coming to the backened are this ${
            fullName + quantity + date + farmersID + id + Role
          }`,
        )
      } else {
        console.log('values UPDATED in the database successifully ')
      }
    },
    )
  }
  res.send({ message: 'values updated in the database' })
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
