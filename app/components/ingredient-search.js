import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

/*
  onIngredientClicked [function]
*/

export default Component.extend({
  store: inject(),

  value: '',
  possibleIngredients: computed(function() {
    return [];
  }),

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
          this.set('possibleIngredients', results);
        }
      });
    },

    onIngredientClicked(ingredient) {
      this.set('value', '');
      this.set('possibleIngredients', []);
      this.onIngredientClicked(ingredient);
    }
  }
});
