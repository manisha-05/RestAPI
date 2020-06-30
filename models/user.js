const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true]
    }, 
    email: {
        type: String,
        required: [true],
        trim: true, 
        // validate(value){
        //     if(!validation.isEmail(value)) {
        //         console.log('Invalid Email!')
        //     } 
        // }
    },
    password:{
        type: String,
        trim: true,
        required: [true],
        minlength : 7
    },
    Image: {
        type: Buffer
    },
    age : {
        type: Number,
        default: 26
    }
})

module.exports = mongoose.model('User', userSchema)
