import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),
  classNames: ['toolbar-padding'],

  actions: {
    goToRecipe(recipe) {
      this.router.transitionTo('recipes.recipe', recipe.id);
     }
  }
});
