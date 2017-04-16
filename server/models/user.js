const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema({
  email: {
    type: String,
    validate: (email) => {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  password: String
})

let User = mongoose.model('User', userSchema)

module.exports = User;
