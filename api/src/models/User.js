const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },

  cpf: {
    type: String,
    required: true,
  },

  fone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = model('User', UserSchema)