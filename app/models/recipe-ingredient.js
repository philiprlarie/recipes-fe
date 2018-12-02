import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  amount: DS.attr('number'),
  createdAt: DS.attr('date'),
  notes: DS.attr('string'),
  updatedAt: DS.attr('date'),

  ingredient: DS.belongsTo('ingredient'),
  measure: DS.belongsTo('measure'),
  recipe: DS.belongsTo('recipe'),

  amountDisplay: computed('amount', 'measure.display', function() {
    return `${this.amount} ${this.get('measure.display') || ''}`.trim();
  })
})
