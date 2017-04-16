const db = require('../models/user')
const hash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
  signUp:(req, res) => {
    req.body.password = hash.generate(req.body.password)
    db.create(req.body, (err, user) => {
      ((err)) ? res.send(err) : res.redirect('/signin')
    })
  },
  signIn:(req, res) => {
    db.findOne({username: req.body.username}, (err, user) => {
      if (err) {
        res.send('Invalid email format')
      }else {
        if (req.user.authenticated) {
          let token = jwt.sign({
            email: req.body.email
          }, process.env.SECRET_KEY)
          localStorage.setItem('token', token)
        }else {
          res.send('Login failed')
        }
      }
    })
  },
  logout: (req, res) => {
    res.send('logout')
  },
  getAll:(req, res) => {
    db.find({}, (err, user) => {
      ((err)) ? res.send(err) : res.send(user)
    })
  },
  update:(req, res) => {
    db.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      ((err)) ? res.send(err) : res.send(user)
    })
  },
  delete:(req, res) => {
    db.findByIdAndRemove(req.params.id, (err, user) => {
      ((err)) ? res.send(err) : res.send(user)
    })
  }
}
