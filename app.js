let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
const mainRouter = require("./api/routes");

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",function (req, res){
    res.status(200).send({msg: "Welcome to EazyBest app."})
});
app.use("/api/v2", mainRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: err});
});
const uri = "mongodb+srv://radoan:radoan151@cluster0.ik1jr.mongodb.net/tutorial?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database did not connect.", err)
});


module.exports = app;
