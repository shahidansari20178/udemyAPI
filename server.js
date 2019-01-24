var express = require('express');
var cors= require('cors');

var app = express();

var publicDir = require('path').join(__dirname,'/imageUploads');
app.use(express.static(publicDir));

const {db} = require('./config/database');
//const fruitsRoute = require('./router/fruitsRoute');
const userRoute = require('./router/userRoute');
const courseRoute = require('./router/courseRoute');
const contentRoute = require('./router/ContentRoute');
const myvideoRoute = require('./router/myvideoRoute');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
//let {authorization} =require('./services/authService');

app.use('/user',userRoute);
app.use('/course',courseRoute);
app.use('/content',contentRoute);
app.use('/myvideo',myvideoRoute);

db.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})

app.listen(3002, (err) => {
    if(err) {
        console.log('Error in connecting with port 3001');
    } else {
        console.log('Server has been set up on port 3001');
    }
});