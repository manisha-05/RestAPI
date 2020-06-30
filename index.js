const express = require('express')
require('dotenv/config')
require('./db/connect')
const userRouter = require('./routers/user')


const app  = express()
const port = process.env.PORT || 3000 

app.use(express.json())
app.use(userRouter)


app.listen(port , () => {
    console.log('Connected to the Server!!')
})