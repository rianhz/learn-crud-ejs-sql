const express = require('express');
const mysql = require('mysql');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sekolah',
  password: '',
});

con.connect((err) => {
  if (err) throw err;
  console.log('connected');

  //get
  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM sekolah';
    con.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render('index', { users: users });
    });
  });

  //post
  app.post('/tambah', (req, res) => {
    const insertSql = `INSERT INTO sekolah (nama,asal) VALUES('${req.body.nama}','${req.body.asal}');`;
    con.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.listen(8000, () => {
  console.log('readyy');
});
