import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

// http://offirgolan.github.io/ember-cp-validations/
// https://embermap.com/video/ember-cp-validations
// https://github.com/miguelcobain/ember-paper/blob/master/addon/components/paper-input.js
// https://github.com/miguelcobain/ember-paper/blob/master/addon/templates/components/paper-input.hbs
// https://github.com/miguelcobain/ember-paper/blob/master/addon/mixins/validation-mixin.js

const Validations = buildValidations({
  name: validator('presence', true),
  prepTime: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      gte: 0,
    })
  ],
  cookTime: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      gte: 0,
    })
  ],
  inactiveTime: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      gte: 0,
    })
  ],
  servings: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gt: 0,
    })
  ],
  source: validator('presence', true),
  steps: validator('presence', true),

  recipeIngredients: [
    validator('presence', true),
    validator('has-many')
  ]
});

export default DS.Model.extend(Validations, {
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
