const axios = require('axios');
const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');

app.use(session({
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 
  }
}));

app.use(express.json({
  limit: '50mb'
}));

const server = app.listen(8080, () => {
  console.log('Server started. port 8080.');
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
  console.log('sql 변경');
  delete require.cache[require.resolve('./sql.js')];
  sql = require('./sql.js');
});

const db = {
  database: 'todo',
  connectionLimit: 10,
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "8520"
};

const dbPool = require('mysql').createPool(db);

app.post('/api/naverlogin/:token', async (request, res)=> {
  try{
    const token = request.params.token;
    const response = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    });
    const userData = [
      {email : response.data.response.email, nickname : response.data.response.name},
      {nickname : response.data.response.name}
    ];
    await req.db('signUp', userData);
    for(let key in userData) request.session[key] = userData[key];
    res.send(userData[0]);
  }catch(err){
    console.log(err);
  }
})

app.post('/api/login', async (request, res) => {
  try{
    await req.db('signUp', request.body.param);
    if(request.body.param.length > 0){
      for(let key in request.body.param[0]) request.session[key] = request.body.param[0][key];
      res.send(request.body.param[0]);
    }else res.send({error: "Please try again or contact system manager."});
  } catch(err){res.send({error: "DB access error"})}
});

app.post('/api/logout', async (request, res) => {
  request.session.destroy();
  res.send('ok');
});

app.post('/apirole/:alias', async (request, res) => {
  if(!request.session.email) return res.status(401).send({error: 'You need to login.'});
  if(request.params.alias == 'todo'){
    try {
      res.send(await req.db(request.params.alias, request.session.email));
    }catch(err){
      res.status(500).send({error: err});
    }
  }else{
    try {
      res.send(await req.db(request.params.alias, request.body.param));
    }catch(err){
      res.status(500).send({error: err});
    }
  }
});

app.post('/api/:alias', async (request, res) => {
  try{
    res.send(await req.db(request.params.alias, request.body.param));
  } catch(err){
    res.status(500).send({error: err});
  }
});

const req = {
  async db(alias, param = [], where = ''){
    return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
      if(error){
        if(error.code != 'ER_DUP_ENTRY') console.log(error);
        resolve({error});
      }else resolve(rows);
    }))
  }
};