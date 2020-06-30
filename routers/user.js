const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const multer = require('multer')


//Sign up Route
router.post('/signup', async (req, res) => {
    try{
    const { name, email, password } = req.body
    if(!email || !password || ! name ) {
      return res.status(422).json({ Error : 'Please enter all the fields'})
    }
   foundUser = await User.findOne( { email})
  if(foundUser) {
     return res.status(422).json({ Error : 'User already exists' })
  }  
  hashedPassword = await bcrypt.hash(password,12)
  const user = new User({
      email,
      password: hashedPassword,
      name
  })
  user.save()
 res.status(200).json({
    success : true,
    data: user
})
} 
catch(e){
    res.status(400).send(`Error Occured ${e}`)
}

})


// Login route
router.post('/login', async (req, res) => {
try {
 const { email , password } = req.body
 if(!email || !password){
     return res.status(422).json({ Error : 'Please enter both email and password '})
 }
foundUser = await User.findOne({email:email })
if(!foundUser){
    return res.status(404).json({ Error : 'User not found!'})
}
user = await bcrypt.compare(password, foundUser.password)
if(user){
    
    const token = jwt.sign({_id : foundUser._id}, process.env.JWT_SECRET)
    return res.status(200).json({ success : true , token })
}
else{

    return res.status(400).send('Inavlid email or password ')
}
}
catch(e) {
    res.status(400).send(e)
}
})


// retrieve logged in user  
router.get('/validatedUser', auth,  async (req, res) => {
    
    res.status(200).send(req.user)
   })





//Image upload using MULTER
const upload = multer({
    limits: { 
        fileSize: 1000000
    },
    fileFilter(req, file , cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error (' Please upload an image'))
    }
    cb(undefined, true)
    }
})

//Route for image upload 
router.post('/user/imageUpload', auth , upload.single('image'), async (req,res) => {
    req.user.Image = req.file.buffer
    await req.user.save()
    res.send('Image Saved Successfully')
}, (error, req, res, next) => {
    res.status(400).send({ error : error.message})
}
)




module.exports = router