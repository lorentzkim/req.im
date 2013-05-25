function Layout() {
  var db;
  this.name = 'layout';

  this.title = function(callback) {
    this.db.get("SELECT value FROM layout WHERE name = 'title'", function(err, row) {
      if (row == undefined) {
        callback(err);
      } else {
        callback(err, row);
      }
    });
    return;
  };


  this.setDb = function(db) {
    this.db = db;
    return;
  }
}

module.exports = new Layout;