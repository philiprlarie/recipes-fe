import DS from 'ember-data';

export default DS.Model.extend({
  createdAt: DS.attr('date'),
  mass: DS.attr('number'),
  notes: DS.attr('string'),
  units: DS.attr('number'),
  updatedAt: DS.attr('date'),
  volume: DS.attr('number'),

  ingredient: DS.belongsTo('ingredient'),
  recipe: DS.belongsTo('recipe')
})
