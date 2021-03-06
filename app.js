var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/demo/index');
var users = require('./routes/demo/users');

var app = express();


var comment = require('./routes/demo/comments/comment');

/**
console.log("start...");
var cjs=fs.readFile('package.json', 'utf8', function (err, txt) {
  console.log("step 1...");
  if (err) {
    throw err;
  }
  console.log("step 2...");
  var djs=fs.readFile('app.js', 'utf8', function (err, content) {
    console.log("step 3...");
    if (err) {
      throw err;
    }
    console.log("step 4...");
    console.log(content);
  });
  console.log("step 5...");
});

console.log("over...");
**/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/build', express.static(path.join(__dirname,'./build')));

app.use('/', routes);
app.use('/users', users);


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.get('/comments', comment.list);
app.get('/comments/:id', comment.get);
app.delete('/comments/:id', comment.delete);
app.post('/comments/add', comment.add);
app.put('/comments/:id', comment.update);

app.set('port', process.env.PORT || 3000);

module.exports = app;
