const mongoose = require('mongoose')
const dotenv = require('dotenv')


mongoose.connect('mongodb+srv://Manisha05:M29gupta@@cluster0-su0y9.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

