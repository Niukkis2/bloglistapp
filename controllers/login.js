const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName })
    const passwordCorrect = user === null 
        ? false 
        : await bcrypt.compare(req.body.passWord, user.passWord)
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    const userForToken = {
        userName: user.userName,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({ token, userName: user.userName, name: user.name })
})

module.exports = loginRouter