var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , layoutModel = require('../../app/models/layout');

var LayoutController = new Controller();

LayoutController.view = function() {
  this.title = 'CMS for node.js';
  this.content = 'filler';
  this.render(null, {pageName: 'her'});
}

module.exports = LayoutController;
