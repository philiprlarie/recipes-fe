import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  store: inject(),

  value: '',

  actions: {
    handleFilterEntry() {
      if (!this.value) {
        return;
      }
      // https://www.emberjs.com/api/ember-data/3.5/classes/DS.Store/methods/query?anchor=query
      this.get('store').query('ingredient', { filter: { name_like: this.value } });
      // this.get('store').findAll('ingredient');
    }
  }
});
