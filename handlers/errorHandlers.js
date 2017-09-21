'use strict';

var CustomError = require('./customError');

/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  console.log('No encontrado');
  const err = new Error('Not Found');
  err.status = 404;
  next(err,req,res);
};


/*
  Production Error Handler

  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  
  let error = new CustomError(err.status, 'en');
  res.json({'Error': error.message});

  /*
  res.status(err.status || 500);
  if()
  res.render('error', {
    message: err.message,
    error: {}
  });*/
};
