var connect = require('connect')
  , RedisStore = require('connect-redis')(connect);;

module.exports = function() {
	//this.use(connect.session({ store: new RedisStore(this.get('redis')), secret: this.get('redis secret') }));
}
