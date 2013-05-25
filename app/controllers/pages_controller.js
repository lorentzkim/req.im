var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'req.im - CMS for node.js'
  this.render();
}

PagesController.view = function() {
  this.title = 'req.im'
  this.content = {
  	pageName: this.param('pageName'),
  	content: 'filler'
  }
  this.render(null, {pageName: 'her'});
}

function getcontent(pageName) {
	return pageName;
}

module.exports = PagesController;
