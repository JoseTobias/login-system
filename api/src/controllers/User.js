const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.user_signup = async (req, res) => {
  const {
    firstName,
    lastName, 
    email,
    userName,
    cpf,
    fone,
    password } = req.body

  const userExists = await User.findOne({ userName })

  if(userExists) {
    return res.status(400).json({
      error: 'Esse nome de usuário já está em uso.'
    })
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    userName,
    cpf,
    fone,
    password
  })

  const token = jwt.sign({ user }, process.env.SECRET)

  return res.json({ token, ...user._doc })
}

exports.user_login = async (req, res) => {
  const { userName,  password } = req.body
  const user = await User.findOne({ userName, password })
  if(user) {

    const token = jwt.sign({ user }, process.env.SECRET)

    return res.json({ token, ...user._doc })
  }
  return res.status(401).json({ error: 'Login inválido. Por favor tente novamente.'})
}

exports.user_get = async (req, res) => {
  const { _id } = req.params
  const user = await User.findOne({ _id })
  if(user) {
    return res.json(user)
  }
  return res.status(401).json({ error: '_id inválido.'})
}

exports.user_update = async (req, res) => {
  const { id } = req.params
  const user = { ...req.body }
  if(user.userName) {
    const userExists = await User.findOne({ userName: user.userName })
    if(userExists) {
      if(userExists._id != id){
        return res.status(400).json({
          error: 'Esse nome de usuário já está em uso.'
        })
      }
    }
  }
  const resp = await User.updateOne({ _id: id }, user)
  return res.json(user)
}