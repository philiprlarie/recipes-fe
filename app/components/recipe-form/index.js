import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { all } from 'rsvp';
import { run } from '@ember/runloop';

/*
  givenRecipe Optional. if passed in, we are in update mode
*/

export default Component.extend({
  classNames: ['toolbar-padding'],

  store: inject(),
  router: inject(),

  formWasSubmitted: false,

  recipe: computed('givenRecipe', function() {
    return this.givenRecipe || this.store.createRecord('recipe');
  }),

  isNew: computed.not('givenRecipe'),

  actions: {
    photoChanged(inputChangeEvent) {
      // https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
      const input = inputChangeEvent.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.$('#recipe-form__image-preview').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    },

    addIngredient() {
      const recipeIngredient = this.store.createRecord('recipeIngredient');
      this.recipe.recipeIngredients.pushObject(recipeIngredient);
      run.later(this, () => {
        this.$('.recipe-ingredient-form').last().find('input')[0].focus();
      });
    },

    deleteIngredient(recipeIngredient) {
      recipeIngredient.deleteRecord();
    },

    save() {
      this.set('formWasSubmitted', true);

      // save recipe
      // save ingredients
      // save recipeIngredients
      this.recipe.validate()
      .then(({ validations }) => {
        if (validations.isValid) {
          this.recipe.save()
          .then(() => {
            return all(this.get('recipe.recipeIngredients').map(ri => {
              return ri.get('ingredient').then(ingredient => ingredient.save());
            }));
          })
          .then(() => {
            return all(this.get('recipe.recipeIngredients').map(ri => {
              ri.set('recipe', this.recipe);
              return ri.save();
            }));
          })
          .then(() => {
            const input = this.$('input[type="file"][name="photo"]')[0];
            if (input.files && input.files[0] && input.files[0].type.match('image.*')) {
              const formData = new FormData();
              formData.append('photo', input.files[0]);

              return fetch(`/api/recipes/${this.recipe.id}/photo`, {
                method: 'post',
                body: formData,
              });
            }
          })
          .then(() => {
            return this.recipe.reload();
          })
          .then(() => {
            this.router.transitionTo('recipes.recipe', this.recipe.id);
          });
        }
      });
    },

    goBack() {
      this.recipe.rollbackAttributes();

      const ris = this.get('recipe.recipeIngredients').slice();
      // make a copy of the array. recipe.recipeIngredients changes length when ri's are rolled back
      ris.forEach(ri => {
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
