import DS from 'ember-data';

export default DS.Model.extend({
  recipe: DS.belongsTo('recipe'),
  ingredient: DS.belongsTo('ingredient'),
  units: DS.attr('number')
})
