//- /**
//-  * This mixin is to patch the problem when mount a tag via DOM
//-  * and the opts is not directly passing to the this.opts
//-  * see this ticket: https://github.com/riot/riot/issues/2049
//-  */

import _ from 'lodash';
import Reflect from 'harmony-reflect';
export default {
  init: function()
  {
    // this.update();
    this.on('mount' , function()
    {
      // another hack
      this.getOpts.$value = Reflect.getPrototypeOf(this.opts);
    });
    /**
    * just to fetch the prototype property and merging it back
    * note the prototype property will overwrite the assined values
    */
    this.on('update' , function()
    {
      const __opts__ = Reflect.getPrototypeOf(this.opts) || {};
      this.opts = _.assign( this.opts , __opts__);
    });
  },
  getOpts: {
    $value: null,
    /**
    * This will only return the init (at mount) value
    * @param {string} key
    * @return {mixed} $value
    */
    $get: function(key = '')
    {
      if (key!=='') {
        return this.$value[key];
      }
      return this.$value;
    }
  }
};
