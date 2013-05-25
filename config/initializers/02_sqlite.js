var sqlite3 = require('sqlite3').verbose()
  , async   = require('async')
  , fs      = require('fs')
  , path    = require('path');

module.exports = function() {
  var db = new sqlite3.Database(this.get('sqlite file'));

  var registry  = require('../../app/model_registry');

  var modelsdir = __dirname + '/../../app/models/';
  var this_     = this;
  async.forEachSeries(fs.readdirSync(modelsdir).sort(), function(file, next) {
    if (/\.js$/.test(file))
    {
      var model = new require(modelsdir + file);
      registry.registerModel(model, db);
      next();
    }
    else {
      next();
    }
  }, function() {
  });
}