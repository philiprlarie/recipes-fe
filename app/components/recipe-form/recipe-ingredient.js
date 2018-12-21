import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

/*
  givenRecipeIngredient Optional. if passed in, we are in update mode
  submit Optional. if isNew is true, there will be a submit button that will call this action when clicked
  deleteIngredient
  formWasSubmitted - boolean. used to decide wheater to show validations
*/

export default Component.extend({
  classNames: ['recipe-ingredient-form'],
  store: inject(),

  recipeIngredient: computed('givenRecipeIngredient', function() {
    return this.givenRecipeIngredient || this.store.createRecord('recipeIngredient')
  }),

  isNew: computed.not('givenRecipeIngredient'),

  measures: computed(function() {
    return this.get('store').peekAll('measure');
  }),

  clear() {
    this.set('recipeIngredient', this.store.createRecord('recipeIngredient'));
  },

  actions: {
    ingredientWasSelected(ingredient) {
      this.set('recipeIngredient.ingredient', ingredient);
    },
    measureWasSelected(measureId) {
      this.set('recipeIngredient.measure', this.measures.findBy('id', measureId));
    },
    addIngredientButtonClicked() {
      this.submit(this.recipeIngredient);
      this.clear();
    },
    deleteIngredientButtonClicked() {
      this.deleteIngredient(this.recipeIngredient)
    }
  }
});
