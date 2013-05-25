module.exports = {
  registerModel : function(model, db) {
    this[model.name] = model;
    model.setDb(db);
  }
};