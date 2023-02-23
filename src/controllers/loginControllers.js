const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Schemas
const UserSchema = require('../models/users')

exports.createUser = async (req, res) => {
  const UserExist = await UserSchema.findOne({ email: req.body.email })

  if (UserExist !== null) {
    return res.status(409).send('Email alrady in use')
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const NewUserData = { username: req.body.username, password: hashedPassword, email: req.body.email }
    UserSchema(NewUserData)
      .save()
      .then(() => res.status(201).send('User was created sucsefully'))
      .catch((err) => res.status(500).send(err))
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.aunthenticateUser = async (req, res) => {
  const User = await UserSchema.findOne({ email: req.body.email })

  if (User == null) {
    return res.status(400).send('Cannnot find user')
  }
  // console.log(User._id.toHexString());
  try {
    if (await bcrypt.compare(req.body.password, User.password)) {
      const UserSing = { id: User._id.toHexString(), email: User.email }
      const accessToken = jwt.sign(UserSing, process.env.ACCESS_TOKEN_SECRET)
      res.json({
        accessToken,
        userId: User._id.toHexString(),
        userName: User.username
      })
    } else {
      res.status(403).send('Not Allowed')
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.aunthenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
