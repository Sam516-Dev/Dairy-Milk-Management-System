const express = require('express')
const mysql = require('mysql');
var cors = require('cors')
const app = express()
const port = 3001

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
//cors- Cross-Origin Resource Sharing
app.use(
    cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
    })
   );

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World! SamDev')
})

// creating database connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234567890',
    database : 'dairy-milk-db'
});
  

app.post('/register', (req, res) => {
    const username = req.body.username;
   const password = req.body.password;

    db.execute(
      'INSERT INTO admin (username, password) VALUES (?,?)',
      [username, password],
      (err, result)=> {
      console.log(err);
      }
    );
 });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//login route
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // db.execute(
    //     'SELECT * FROM users WHERE username = ? AND password = ?',
    //     [username, password],
    //     (err, result)=> {
    //         if (err) {
    //             res.send({err: err});
    //         }
    
    //          if (result.length > 0) {
    //              res.send( result);
    //          }
    //          else ({ message: 'Wrong username/password comination!' })
            
    //     }
    // )
    res.send(`Username: ${username} Password: ${password}`);
})