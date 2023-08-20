const express = require('express');
const cors = require('cors');
const db = require('./mongoose/mongoose');
const bcrypt = require('bcryptjs');
const {userRegister} = require('./controllers/userRegister');
const { userLogin } = require('./controllers/userLogin');
const { userProfile, userLogout } = require('./controllers/userProfile');
const cookieParser = require('cookie-parser');
const { userPost } = require('./controllers/userPost');
const multer  = require('multer');
const { viewPosts } = require('./controllers/viewPosts');
const { getPost } = require('./controllers/getPost');
const { updatePost } = require('./controllers/updatePost');
const uploadMiddleware = multer({ dest: 'uploads/' });
const port = process.env.PORT || 4000;
const app = express()

app.use(cors({credentials:true, origin:process.env.ENDPOINT}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'))

app.get('/',function(req, res){
    res.send('Welcome to Home Page')
})

app.post('/register', userRegister);
app.post('/login' ,userLogin);
app.get('/profile',userProfile);
app.post('/logout', userLogout);
app.post('/post', uploadMiddleware.single('file'), userPost);
app.get('/viewPost',viewPosts);
app.get('/getPost/:id',getPost);
app.put('/post' ,uploadMiddleware.single('file'), updatePost);


app.listen(port,function(err){
    console.log("Server running on port: ",port);
})