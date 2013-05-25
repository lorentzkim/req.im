var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'req.im - CMS for node.js'
  this.render();
}

PagesController.view = function() {
  this.title = 'req.im - CMS for node.js'
  this.content = getcontent(this.param('pageName'));
  this.render();
}

function getcontent(pageName) {
	return pageName;
}

module.exports = PagesController;
