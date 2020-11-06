const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', {url: 1, title: 1, author: 1})
    if (users) {
        res.json(users)
    } else {
        res.status(404).end()
    }
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User.find(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

usersRouter.post('/', async (req, res) => {
    const checkCreds = async (uName, pW) => {
        if (uName.length >= 3 && pW.length >= 3) {
            const exists = await User.exists({ userName: uName })
            return !exists
        }
        return false
    }
    if (await checkCreds(req.body.userName, req.body.passWord)) {
        const saltRounds = 10
        const user = new User({
            userName: req.body.userName,
            name: req.body.name,
            passWord: await bcrypt.hash(req.body.passWord, saltRounds)
        })
        const savedUser = await user.save()
        res.json(savedUser)
    } else {
        res.status(400).send('username and password must be atleast 3 characters long, username must be unique')
    }
})

module.exports = usersRouter