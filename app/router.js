import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('recipes', function() {
    this.route('recipe', { path: '/:recipe_id' });
    this.route('edit', { path: '/edit/:recipe_id' });
  });
});

export default Router;
