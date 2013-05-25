function User() {
  var db;
  this.name = 'users';

  this.authenticate = function(username, password, callback) {
    this.db.get("SELECT * FROM " + this.name + " WHERE username = ? AND password = ?", [username, password], function(err, row) {
      if (typeof row == 'undefined') { callback(err); }
      callback(err, row);
    });
    return;
  };

  this.findById = function(id, callback) {
    this.db.get("SELECT * FROM " + this.name + " WHERE id = ?", [id], function(err, row) {
      if (typeof row == 'undefined') { callback(err); }
      callback(err, row);
    });
    return;
  }

  this.setDb = function(db) {
    this.db = db;
    var name = this.name;

    if (this.createTable()) {
      this.insertDefaultRecords();
    }

    return;
  }

  /**** PROTECTED(?) ****/

  this.createTable = function() {
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS " + this.name + " \
      ( \
        id INTEGER PRIMARY KEY NOT NULL, \
        username TEXT NOT NULL, \
        password TEXT NOT NULL \
      )"
    , function(err) {
      if (err != null) {
        return err;
      }
    });

    return true;
  }

  this.insertDefaultRecords = function() {
    this.db.exec(
      "INSERT INTO " + this.name + " \
      (username, password) VALUES ('admin', 'password')"
    , function(err) {
        if (err != null) {
          return err;
        }
      });

    return true;
  }
}

module.exports = new User;