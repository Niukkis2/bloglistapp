const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: String,
    name: String,
    passWord: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passWord
    }
})

module.exports = mongoose.model('User', userSchema)