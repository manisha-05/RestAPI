# RestApi

###This project demonstrates a sample restapi with routes for signup, login and image upload.

SignUp route - *This route demonstarte a signup route which takes as input  three fields from the user(name, email and password) and reverts back with the encrypted password using the **bcrypt library**.*

Login route - *This route demonstarte a login route which takes as input two  fields from the user(email and password) and reverts back with the a **JSONWeb token**. Also both the fields are mandatory and the route sends back proper error message if information not provided.*

Image Upload route -*This route takes input a middleware function which authenticates a user and lets user to upload a image using the **MULTER library**.
Also the middleware function lets only the authenticated user to upload the image.*

#### Technologies Used

- **NodeJS**
- **ExpressJS**
- **bcrypt library**
- **JSON Web Token**
- **Multer library**
