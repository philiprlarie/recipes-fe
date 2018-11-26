import DS from 'ember-data';

export default DS.Model.extend({
  createdAt: DS.attr('date'),
  name: DS.attr('string'),
  updatedAt: DS.attr('date'),

  recipes: DS.hasMany('recipe'),
  recipeIngredients: DS.hasMany('recipe-ingredients')
});
