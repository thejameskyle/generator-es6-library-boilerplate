var setup = require('./setup');

global['<%= global %>'] = require('../../tmp/__entry');
global.mocha.setup('bdd');
global.onload = function() {
  global.mocha.checkLeaks();
  global.mocha.globals(['stub', 'spy', 'expect']);
  global.mocha.run();
  setup();
};
