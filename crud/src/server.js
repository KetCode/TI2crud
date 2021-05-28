 
const express = require("express")
const server = express()
const bodyParser = require('body-parser')

const sql = require('./database');

server.use(bodyParser.json());

//HOME
server.get('/', (req, res) => {
    res.send('Hello World')
})

// CRUD - CREATE READ UPDATE DELETE
// READ ALL
server.get('/show', (req, res, next) => {
  sql.query('select * from contatos', (err, result) => {
    console.log(result);
    res.send(result);
  });
});

// READ SPECIFIC ID
server.get('/show/:id', (req, res, next) => {
  var id = req.params.id;
  sql.query("select * from contatos where id = "+ id, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

// CREATE
server.post('/create', (req, res, next) => {
    var dados = req.body
    var pnome = dados.pnome
    var snome = dados.snome
    var endereco = dados.endereco
    var fone = dados.fone
    // console.log(dados)

    sql.query("insert into contatos (pnome, snome, endereco, fone) values ('" + pnome + "','" + snome + "','" + endereco + "','" + fone + "')", (err, rows) => {
      if (!err) res.send(rows)
      else console.log(err)
    })
  });

// UPDATE SPECIFIC ID
server.post('/update/:id', (req, res, next) => {
    var dados = req.body
    var id = req.params.id
    var pnome = dados.pnome
    var snome = dados.snome
    var endereco = dados.endereco
    var fone = dados.fone
    sql.query("update contatos set pnome='" + pnome + "', snome='" + snome + "', endereco='" + endereco + "', fone='" + fone + "' where id = " + id, (err, rows, fields) => {
      if (!err) res.send(rows)
      else console.log(err)
  });
});

// DELETE SPECIFIC ID
server.get('/delete/:id', (req, res) => {
  var id = req.params.id;
  sql.query('delete from contatos where id = ' + id, (err, result) => {
    console.log(result);
    res.send(result)
  })
})

server.listen(3001, () => console.log('rodando'))