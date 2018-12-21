import Component from '@ember/component';
import { computed } from '@ember/object';

/*
  measureWasSelected
  measure
  measures
*/

export default Component.extend({
  classNames: ['inline-block'],

  getSearchResults: computed(function () {
    return (searchValue) => Promise.resolve(this.measures.filter(measure => measure.unit.includes(searchValue)));
  })
});
