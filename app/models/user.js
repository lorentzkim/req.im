function User() {
  var db;
  this.name = 'users';

	this.authenticate = function(username, password, callback) {
		this.db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function(err, row) {
      if (row == undefined) {
        callback(err);
      } else {
        callback(err, row);
      }
    });
		return;
	};

	this.findById = function(id, callback) {
		this.db.get("SELECT * FROM users WHERE id = ?", [id], function(err, row) {
      if (row == undefined) {
        callback(err);
      } else {
        callback(err, row);
      }
    });
		return;
	}

  this.setDb = function(sqliteDb) {
    this.db = sqliteDb;
    return;
  }
}

module.exports = new User;