function User() {
	this.authenticate = function(username, password, callback) {
		// Always works for now ... !
		callback(null, {id: 1, username: username});
		return;
	};

	this.findById = function(id) {
		callback(null, {id: 1, username: username});
		return;
	}
}

module.exports = new User;