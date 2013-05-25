module.exports = {
  registerModel : function(model, sqliteDb) {
    model.setDb(sqliteDb);
    this[model.name] = model;
  }
};