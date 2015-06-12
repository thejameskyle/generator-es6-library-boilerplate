'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var npm = require('npm');
var gitConfig = require('git-config');
var camelcase = require('lodash.camelcase');
var kebabcase = require('lodash.kebabcase');
var fs = require('fs');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-duper ' + chalk.red('Es6LibraryBoilerplate') + ' generator!'
    ));

    npm.load(function() {
      var config = gitConfig.sync();
      var prompts = [{
        type: 'input',
        name: 'user',
        message: 'What is your github username/organization?',
        default: npm.whoami()
      }, {
        type: 'input',
        name: 'repo',
        message: 'What is your repo/projects name?',
        default: kebabcase(this.appname)
      }, {
        type: 'input',
        name: 'description',
        message: 'What is a description of this project? (eg. A nice module.)'
      }, {
        type: 'input',
        name: 'author',
        message: 'Who is the author of this project?',
        default: config.user.name + ' <' + config.user.email + '>'
      }, {
        type: 'input',
        name: 'global',
        message: 'What would you like the global to be (in browsers)?',
        default: camelcase(this.appname)
      }];

      this.prompt(prompts, function (props) {
        this.user = props.user;
        this.repo = props.repo;
        this.description = props.description;
        this.author = props.author;
        this.global = props.global;
        done();
      }.bind(this));
    }.bind(this));
  },

  writing: {
    app: function() {
      var root = this.sourceRoot();
      fs.readdirSync(root).forEach(function(p) {
        if (fs.lstatSync(path.join(root, p)).isFile()) {
          this.template(p, p);
        }
      }, this);
      this.directory('test');
      this.directory('src');
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});
