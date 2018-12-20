import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

/*
  ingredientWasSelected [function]
*/

export default Component.extend({
  tagName: '',
  store: inject(),

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('value', this.get('ingredient.name'));
  },

  value: '',
  possibleIngredients: computed(function() {
    return [];
  }),

  shouldShowCreateButton: computed('value', 'possibleIngredients', function() {
    return (
      this.value &&
      !this.possibleIngredients.findBy('name', this.value) &&
      !(this.get('ingredient.name') === this.value)
    );
  }),

  shouldShowList: computed('possibleIngredients.[]', 'shouldShowCreateButton', function() {
    return this.possibleIngredients.length || this.shouldShowCreateButton
  }),

  clear() {
    this.set('value', '');
    this.set('possibleIngredients', []);
  },

  actions: {
    handleFilterEntry() {
      const searchValue = this.value;
      if (!searchValue) {
        this.set('possibleIngredients', []);
        return;
      }
      // https://www.emberjs.com/api/ember-data/3.5/classes/DS.Store/methods/query?anchor=query
      this.get('store').query('ingredient', { filter: { name_like: searchValue } }).then(results => {
        if (searchValue === this.value) {
          this.set('possibleIngredients', results.slice(0, 5));
        }
      });
    },

    onIngredientClicked(ingredient) {
      this.clear();
      this.ingredientWasSelected(ingredient);
    },

    onNewIngredientClicked() {
      let newIngredient = this.store.createRecord('ingredient', {
        name: this.value
      });

      this.clear();
      this.ingredientWasSelected(newIngredient);
    }
  }
});
