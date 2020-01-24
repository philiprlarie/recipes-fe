import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default Component.extend({
  router: service(),

  classNames: ['toolbar-padding'],

  canAdd: computed(function() {
    return ENV.EmberENV.FEATURES.addRecipe;
  }),

  ajaxRootURL: computed(function() {
    return ENV.ajaxRootURL;
  }),

  actions: {
    goToRecipe(recipe) {
      this.router.transitionTo('recipes.recipe', recipe.id);
     }
  }
});
