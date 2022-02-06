const express = require('express')
const mysql = require('mysql2');
var cors = require('cors')
const app = express()
const port = 3001

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World! SamDev')
})

// creating database connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234567890',
    database : 'dairy-milk-db'
});
  

app.post('/login', (req, res) => {
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

