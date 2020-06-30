const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const mongoose = require('mongoose')


//Middleware function created to verify user using JWT token 
const auth = async (req, res, next  ) => {
    try{
        const { authorization } = req.headers
        if(!authorization) {
           return res.status(401).json({ Error: 'You must be logged in !!'})
        }
        const token = authorization.replace('Bearer ','')
        decoded = jwt.verify(token, process.env.JWT_SECRET)
         const user = await User.findById(decoded._id)
       if(!user){
            res.status(404).json({ Message : "User not found" })
        }
        req.user = user
        
        next()
    }
    catch(e) {
        res.status(400).send(e)
    }

}


module.exports = auth