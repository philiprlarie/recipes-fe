import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  source: DS.attr('string'),
  steps: DS.attr('string'),

  ingredients: DS.hasMany('ingredient'),
  recipeIngredients: DS.hasMany('recipe-ingredient')
})
