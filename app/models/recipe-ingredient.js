import DS from 'ember-data';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

// http://offirgolan.github.io/ember-cp-validations/

const Validations = buildValidations({
  amount: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gt: 0,
    })
  ],
  ingredient: validator('presence', true),
  measure: validator('presence', true),
  recipe: validator('presence', true)
});

export default DS.Model.extend(Validations, {
  amount: DS.attr('number'),
  createdAt: DS.attr('date'),
  notes: DS.attr('string'),
  updatedAt: DS.attr('date'),

  ingredient: DS.belongsTo('ingredient'),
  measure: DS.belongsTo('measure'),
  recipe: DS.belongsTo('recipe'),

  amountDisplay: computed('amount', 'measure.display', function() {
    return `${this.amount} ${this.get('measure.display') || ''}`.trim();
  }),

  ingredientAmountDisplay: computed('ingredient', 'amountDisplay', function() {
    if (this.get('measure.display') === 'to taste') {
      return `${this.get('ingredient.name')} to taste`;
    } else {
      return `${this.amountDisplay} ${this.get('ingredient.name')}`;
    }
  })
});
