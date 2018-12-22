import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['toolbar-padding'],

  totalTime: computed('recipe.{cookTime,prepTime,inactiveTime}', function() {
    return this.recipe.cookTime + this.recipe.prepTime + this.recipe.inactiveTime;
  }),

  timeString: computed('recipe.{cookTime,prepTime,inactiveTime}', function() {
    const { cookTime, prepTime, inactiveTime } = this.recipe;
    const prepTimeStr = prepTime > 0 ? `${prepTime} minutes prep, ` : '';
    const cookTimeStr = cookTime > 0 ? `${cookTime} minutes active, ` : '';
    const inactiveTimeStr = inactiveTime > 0 ? `${inactiveTime} minutes inactive, ` : '';

    if (!prepTimeStr && !cookTimeStr && !inactiveTimeStr) {
      return '';
    }

    const totalTimeDescription = `${prepTimeStr}${cookTimeStr}${inactiveTimeStr}`.slice(0, -2);
    return `(${totalTimeDescription})`;
  })
});
