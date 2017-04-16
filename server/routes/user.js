const express = require('express');
const router = express.Router()
const userController = require('../controllers/user')
const passport = require('passport');
const verifier = require('../helpers/jwt');


router.get('/', (req, res) => {
  res.render('home')
})

router.get('/signin', (req, res) => {
  res.render('signin')
})

router.get('/register', (req, res) => {
  res.render('signup')
})

router.post('/signup', userController.signUp)

router.post('/login', passport.authenticate('local', {session: false}), userController.signIn)

router.post('/logout', userController.logout)

router.get('/users', verifier ,userController.getAll)

router.put('/users/:id', verifier ,userController.update)

router.delete('/users/:id', verifier , userController.delete)

module.exports = router;
