var express = require('express');

module.exports = function() {
  this.use(express.errorHandler());

  // Redis connection details
  this.set('redis', {
  	'host': 'localhost',
  	'db': 'reqim',
  	'pass': 'reqim'
  });

  // Redis session secret value (!)
  this.set('redis secret', 'keyboard cat');
}
