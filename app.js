var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const chapterRouter = require('./routes/chapter');
const mongoose = require('mongoose');
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URL,(err)=>{
    if(err)
        console.log(err);
    console.log("connected to db");
});

app.use('/api/', indexRouter);
app.use('/api/chapters/',chapterRouter);
app.use('/api/users', usersRouter);

module.exports = app;
