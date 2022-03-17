const express = require('express'); //returned express is a function
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');
const reportFilesRouter = require('./routes/reportFiles');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');
const staffRouter = require('./routes/staff');
const pendingStaffRouter = require('./routes/pendingStaff');
const fileCaseRouter = require('./routes/fileCase');
const fastcardRouter = require('./routes/fascard');
const emailRouter = require('./routes/email');
const solutionRouter = require('./routes/solution');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const MongoStore = require('connect-mongo');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
} // run the content when r are at dev stage

const app = express(); //The app returned by express() is in fact a JavaScript Function, it's simply a callback to handle request
const port = process.env.PORT || 5000; //why do we need to identify port here
// const http = require('http').Server(app);

app.use(express.json()); //casting json into js
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080", "*"],
    // origin: "*", // location of the react app were connecting to
    credentials: true 
}))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true} ); //, useCreateIndex: true}
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.urlencoded({extended: false})); //it parses incoming requests with urlencoded payloads and is based on body-parser.
//when extended is set true, it parse the url-encoded data with the querystring library
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(expressSession({
    secret: process.env.SESSION_SECRET, //a key that encrypt all the information
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: uri}), 
    cookie:{
        maxAge: 1000 * 60 * 60 * 12
    }
}));

app.use(passport.initialize()); //create passport object
app.use(passport.session());

app.use('/user', usersRouter);
app.use('/filecase', fileCaseRouter);
app.use('/reportFiles', reportFilesRouter);
app.use('/signIn', signInRouter);
app.use('/signUp', signUpRouter);
app.use('/staff', staffRouter);
app.use('/pendingstaff', pendingStaffRouter);
app.use('/fascard', fastcardRouter);
app.use('/email', emailRouter);
app.use('/solution', solutionRouter);

const server = app.listen(port, (error) => {
    (error) ? console.log('Error from app.listen', error) : console.log(`Server is running on port: ${port}`);
})

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

const monitor = require('./controllers/monitorController');
monitor.monitorSupport(io);