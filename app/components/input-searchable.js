import Component from '@ember/component';
import { computed, get } from '@ember/object';

/*
  label - String
  placeholder - String
  createButtonText - String. optional, only needed if createOptionWasSelected action is passed
  getSearchResults - Callback function. should return promise that resolves to  list of options
  optionWasSelected -
  createOptionWasSelected - optional. if not passed, the create option row will not show
  selectedOption - the option that was selected. data down
  keyPath - the key of the value that should show in the results
  validationErrorMessages - array of objects with message property. can be empty
  formWasSubmitted - boolean. used to decide wheater to show validations
*/

export default Component.extend({
  classNames: ['inline-block', 'pos-relative'],

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('value', get(this.selectedOption, this.keyPath));
  },

  value: '',

  possibleOptions: computed(function() {
    return [];
  }),

  shouldShowCreateButton: computed('createOptionWasSelected', 'value', 'possibleOptions.[]', function() {
    return (
      this.createOptionWasSelected &&
      this.value &&
      !this.possibleOptions.findBy(this.keyPath, this.value) &&
      !(get(this.selectedOption, this.keyPath) === this.value)
    );
  }),

  shouldShowList: computed('possibleOptions.[]', 'shouldShowCreateButton', function() {
    return this.possibleOptions.length || this.shouldShowCreateButton
  }),

  clear() {
    this.set('value', '');
    this.set('possibleOptions', []);
  },

  actions: {
    handleFilterEntry() {
      const searchValue = this.value;
      if (!searchValue) {
        this.set('possibleOptions', []);
        return;
      }
      this.getSearchResults(searchValue).then(results => {
        if (searchValue === this.value) {
          this.set('possibleOptions', results.slice(0, 5));
        }
      });
    },

    onOptionClicked(option) {
      this.clear();
      this.optionWasSelected(option);
    },

    onCreateButtonClicked() {
      this.createOptionWasSelected(this.value);
      this.clear();
    }
  }
});
