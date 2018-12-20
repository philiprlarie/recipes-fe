import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { all } from 'rsvp';

/*
  givenRecipe Optional. if passed in, we are in update mode
*/

export default Component.extend({
  store: inject(),
  router: inject(),

  classNames: ['toolbar-padding'],

  recipe: computed('givenRecipe', function() {
    return this.givenRecipe || this.store.createRecord('recipe')
  }),

  isNew: computed.not('givenRecipe'),

  actions: {
    addIngredient(recipeIngredient) {
      this.recipe.recipeIngredients.pushObject(recipeIngredient)
    },

    save() {
      // save recipe
      // save ingredients
      // save recipeIngredients
      this.recipe.save().then(() => {
        return all(this.get('recipe.recipeIngredients').map(ri => {
          return ri.get('ingredient').then(ingredient => ingredient.save());
        }));
      }).then(() => {
        return all(this.get('recipe.recipeIngredients').map(ri => {
          ri.set('recipe', this.recipe);
          return ri.save();
        }));
      }).then(() => {
        this.router.transitionTo('recipes.recipe', this.recipe.id);
      });
    },

    goBack() {
      this.recipe.rollbackAttributes()
      
      if (this.isNew) {
        this.router.transitionTo('recipes');
      } else {
        this.router.transitionTo('recipes.recipe', this.recipe.id);
      }
    }
  }
});
