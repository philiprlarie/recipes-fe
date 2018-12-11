import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

/*
  givenRecipe Optional. if passed in, we are in update mode
*/

export default Component.extend({
  store: inject(),

  recipe: computed('givenRecipe', function() {
    return this.givenRecipe || this.store.createRecord('recipe')
  }),

  actions: {
    addIngredient(recipeIngredient) {
      this.recipe.recipeIngredients.pushObject(recipeIngredient)
    }
  }
});
