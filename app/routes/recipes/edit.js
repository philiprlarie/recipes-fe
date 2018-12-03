import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
       _measures: this.store.findAll('measure')
    });
  }
});
