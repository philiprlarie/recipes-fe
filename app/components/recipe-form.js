import Component from '@ember/component';

export default Component.extend({
  testIngredient: null,

  actions: {
    ingredientWasSelected(ingredient) {
      this.set('testIngredient', ingredient);
    }
  }
});
