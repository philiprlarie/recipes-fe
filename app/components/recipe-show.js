import Component from '@ember/component';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default Component.extend({
  classNames: ['toolbar-padding'],

  canEdit: computed(function() {
    return ENV.EmberENV.FEATURES.editRecipe;
  }),

  imageURL: computed(function() {
    return ENV.ajaxRootURL + this.recipe.photoUrl;
  }),

  actions: {
    printRecipe() {
      window.print();
    },
  },
});
