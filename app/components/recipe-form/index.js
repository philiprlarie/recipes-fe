import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { all } from 'rsvp';

/*
  givenRecipe Optional. if passed in, we are in update mode
*/

export default Component.extend({
  classNames: ['toolbar-padding'],

  store: inject(),
  router: inject(),

  formWasSubmitted: false,

  recipe: computed('givenRecipe', function() {
    return this.givenRecipe || this.store.createRecord('recipe')
  }),

  isNew: computed.not('givenRecipe'),

  actions: {
    addIngredient(recipeIngredient) {
      this.recipe.recipeIngredients.pushObject(recipeIngredient)
    },

    deleteIngredient(recipeIngredient) {
      recipeIngredient.deleteRecord();
    },

    save() {
      this.set('formWasSubmitted', true);

      // save recipe
      // save ingredients
      // save recipeIngredients
      this.recipe.validate().then(({ validations }) => {
        if (validations.isValid) {
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
        }
      })
    },

    goBack() {
      this.recipe.rollbackAttributes()

      this.get('recipe.recipeIngredients').forEach(ri => {
        ri.rollbackAttributes();
      });

      if (this.isNew) {
        this.router.transitionTo('recipes');
      } else {
        this.router.transitionTo('recipes.recipe', this.recipe.id);
      }
    }
  }
});
