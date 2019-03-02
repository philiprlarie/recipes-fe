import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize() {
    let json = this._super(...arguments);

    delete json.data.relationships;
    delete json.data.attributes['photo-url'];

    return json;
  }
});
