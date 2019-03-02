import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  abbreviation: DS.attr('string'),
  createdAt: DS.attr('date'),
  measureType: DS.attr('string'),
  unit: DS.attr('string'),
  updatedAt: DS.attr('date'),

  display: computed('unit', 'abbreviation', function() {
    if (this.unit === 'count') {
      return '';
    }

    if (this.abbreviation) {
      return `${this.abbreviation}.`;
    }
    return this.unit;
  })
});
