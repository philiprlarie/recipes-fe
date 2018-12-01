import Component from '@ember/component';

export default Component.extend({
  testIngredient: null,

  actions: {
    ingredientWasClicked(ingredient) {
      this.set('testIngredient', ingredient);
    }
  }
});
