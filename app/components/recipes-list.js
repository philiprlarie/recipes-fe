import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  router: service(),
  classNames: ['toolbar-padding'],
  canAdd: computed(function() {
    return window.EmberENV.FEATURES.addRecipe;
  }),
  actions: {
    goToRecipe(recipe) {
      this.router.transitionTo('recipes.recipe', recipe.id);
     }
  }
});
