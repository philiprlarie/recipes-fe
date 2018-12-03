import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

/*
  givenRecipeIngredient Optional. if passed in, we are in update mode
*/

export default Component.extend({
  store: inject(),

  recipeIngredient: computed('givenRecipeIngredient', function() {
    return this.givenRecipeIngredient || this.store.createRecord('recipeIngredient')
  }),

  measures: computed(function() {
    return this.get('store').peekAll('measure');
  }),

  actions: {
    ingredientWasSelected(ingredient) {
      this.set('recipeIngredient.ingredient', ingredient);
    },
    measureWasSelected(measureId) {
      this.set('recipeIngredient.measure', this.measures.findBy('id', measureId))
    }
  }
});
