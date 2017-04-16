const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const db = require('./models/user');
const jwt = require('express-jwt')
const blacklist = require('express-jwt-blacklist');
const hash = require('password-hash');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user')

const passport = require('passport');
const Strategy = require('passport-local').Strategy


passport.use(new Strategy({
  usernameField: 'email'
},
  (username, password, cb) => {
    db.findOne({email: username}, (err, user) => {
      if (hash.verify(password, user.password)) {
        let authenticated = false
        cb(null, {user: user, authenticated: true})
      } else {
        cb('Username or password is not exists')
      }
    })
  }
))

app.use(passport.initialize())

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:true}))

const user = require('./routes/user')

app.use('/', user)

app.listen(3000, () => {
  console.log('Live');
})
