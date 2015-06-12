var setup = require('./setup');

global['<%= global %>'] = require('../../src/<%= repo %>');
global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
setup();
