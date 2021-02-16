const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const mongoose = require('mongoose');
const environment = require('dotenv');
const cors = require('cors');

const routes = require('./App/routes');
const router = require('./App/Chats/routes');

environment.config()

const app = express()

app.options('*', cors());
app.use(cors());

const dbConnection = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log(`Connected to ${process.env.MONGODB_URI}...`))
    .catch((err) => console.log('Not connected' + err));
}

dbConnection();

app.use(morganLogger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}));

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 3600000 }
}));

app.use('/api/users', routes.users);
app.use('/api/jobs', routes.jobs);
app.use('/api/applications', routes.applications);
app.use('/api/wallet', routes.wallet);
app.use('/api/users/giver', routes.jobGiver);
app.use('/api/users/seeker', routes.jobSeeker);
app.use('/api/chats', routes.chats);
app.use('/api/messages', routes.messages);
app.use('/api/payments', routes.payment);

app.get('/', (req, res) => {
  res.send("Welcome to Husyl")
})


options = {
  cors: true
}

const http = require("http").Server(app);
const io = require('socket.io')(http, options)

io.on('connection', socket => {
  console.log('Connection Established')
  socket.on('sendMessage', (data) => {
    console.log(data)
    io.emit('newMessage', data)
  })
})

http.listen(process.env.PORT || 5000, () => console.log(`Listening on port: ${process.env.PORT || 5000}`));