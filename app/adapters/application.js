import DS from 'ember-data';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: computed(function() {
    return ENV.ajaxRootURL + '/api';
  }),
});
