import Component from '@ember/component';
import { computed } from '@ember/object';

/*
  measureWasSelected
  measure
  measures
  formWasSubmitted - boolean. used to decide wheater to show validations
  validationErrorMessages - array of objects with message property. can be empty
*/

export default Component.extend({
  classNames: ['inline-block'],

  getSearchResults: computed(function () {
    return (searchValue) => Promise.resolve(this.measures.filter(measure => measure.unit.includes(searchValue)));
  })
});
