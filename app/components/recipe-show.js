import Component from '@ember/component';

export default Component.extend({
  classNames: ['toolbar-padding'],
  actions: {
    printRecipe() {
      window.print();
    },
  },
});
