import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    const recipe = params.recipe_id === 'new' ? null : this.store.findRecord(
      'recipe',
      params.recipe_id,
      {
        include: 'ingredients,recipe-ingredients,recipe-ingredients.ingredient,recipe-ingredients.measure'
      }
    );

    return RSVP.hash({
      recipe,
       _measures: this.store.findAll('measure')
    });
  }
});
