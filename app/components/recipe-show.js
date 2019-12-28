import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['toolbar-padding'],
  actions: {
    printRecipe() {
      window.print();
    },
  },
  canEdit: computed(function() {
    return window.EmberENV.FEATURES.editRecipe;
  }),
});
