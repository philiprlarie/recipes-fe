import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

/*
  recipeIngredient. required
  deleteIngredient
  formWasSubmitted - boolean. used to decide wheater to show validations
*/

export default Component.extend({
  classNames: ['recipe-ingredient-form layout-row'],
  store: inject(),

  measures: computed(function() {
    return this.get('store').peekAll('measure');
  }),

  actions: {
    deleteIngredientButtonClicked() {
      this.deleteIngredient(this.recipeIngredient);
    }
  }
});
