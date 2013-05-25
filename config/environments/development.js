var express = require('express');

module.exports = function() {
  this.use(express.errorHandler());

  // SQLite
  this.set('sqlite file', 'sqlite/db');
}
