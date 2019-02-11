import Ember from 'ember';
import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
  if (!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}


export function wrapLinkInAnchor(param) {
  if (validURL(param)) {
    const value = Ember.Handlebars.Utils.escapeExpression(param);
    return htmlSafe(`<a href=${value}>${value}</a>`);
  }

  return param;
}

export default helper(wrapLinkInAnchor);
