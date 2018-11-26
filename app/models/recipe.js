import DS from 'ember-data';

export default DS.Model.extend({
  cookTime: DS.attr('number'),
  createdAt: DS.attr('date'),
  inactiveTime: DS.attr('number'),
  name: DS.attr('string'),
  prepTime: DS.attr('number'),
  servings: DS.attr('number'),
  source: DS.attr('string'),
  steps: DS.attr('string'),
  updatedAt: DS.attr('date'),

  ingredients: DS.hasMany('ingredient'),
  recipeIngredients: DS.hasMany('recipe-ingredient')
})
