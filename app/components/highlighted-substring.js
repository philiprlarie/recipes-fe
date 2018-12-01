import Component from '@ember/component';

/*
  str [String]: the string to display
  substr [String]: the part of the string to bold
*/

export default Component.extend({
  // passed in
  str: '',
  substr: '',

  beforeMatch: '',
  afterMatch: '',
  match: '',

  didReceiveAttrs() {
    this._super(...arguments);
    this.setMatchStrings();
  },

  setMatchStrings() {
    const matchStartIdx = this.str.indexOf(this.substr);

    if (matchStartIdx < 0) {
      this.set('beforeMatch', this.str);
      this.set('afterMatch', '');
      this.set('match', '');
      return;
    }

    this.set('beforeMatch', this.str.slice(0, matchStartIdx));
    this.set('match', this.substr);
    this.set('afterMatch', this.str.slice(matchStartIdx + this.substr.length));
  }
});

// case 1
// str: 'banana', substr: 'na'

// case 2
// str: 'banana', substr: 'xa'

// case 3
// str: 'banana', substr: 'ba'

// case 4
// str: 'banana', substr: 'anana'

// case 5
// str: 'banana', substr: 'banana'
