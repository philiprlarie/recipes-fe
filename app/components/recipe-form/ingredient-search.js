import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

/*
  ingredientWasSelected [function]
  ingredient
  formWasSubmitted - boolean. used to decide wheater to show validations
  validationErrorMessages - array of objects with message property. can be empty
*/

export default Component.extend({
  classNames: ['inline-block'],

  store: inject(),

  getSearchResults: computed(function () {
    return (searchValue) => this.get('store').query('ingredient', { filter: { name_like: searchValue } });
  }),

  actions: {
    createIngredientWasSelected(value) {
      let newIngredient = this.store.createRecord('ingredient', {
        name: value
      });

      this.ingredientWasSelected(newIngredient);
    }
  }
});
