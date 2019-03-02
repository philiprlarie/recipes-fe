import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

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
  photoUrl: DS.attr('string'),
  prepTime: DS.attr('number'),
  servings: DS.attr('number'),
  source: DS.attr('string'),
  steps: DS.attr('string'),
  updatedAt: DS.attr('date'),

  ingredients: DS.hasMany('ingredient'),
  recipeIngredients: DS.hasMany('recipe-ingredient'),

  totalTime: computed('cookTime', 'prepTime', 'inactiveTime', function() {
    return this.cookTime + this.prepTime + this.inactiveTime;
  }),

  timeString: computed('cookTime', 'prepTime', 'inactiveTime', function() {
    const prepTimeStr = this.prepTime > 0 ? `${this.prepTime} minutes prep, ` : '';
    const cookTimeStr = this.cookTime > 0 ? `${this.cookTime} minutes active, ` : '';
    const inactiveTimeStr = this.inactiveTime > 0 ? `${this.inactiveTime} minutes inactive, ` : '';

    if (!prepTimeStr && !cookTimeStr && !inactiveTimeStr) {
      return '';
    }

    const totalTimeDescription = `${prepTimeStr}${cookTimeStr}${inactiveTimeStr}`.slice(0, -2);
    return `(${totalTimeDescription})`;
  })
});
