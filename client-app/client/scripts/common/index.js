'use strict';
require('angular-ui-router');
require('angular-ui-bootstrap');
// require('angular-animate');
require('lbServices');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ui.bootstrap', 'lbServices', 'ui.bootstrap.dropdown', 'ui.bootstrap.modal']);
    // inject:folders start
    require('./controllers')(app);
    // inject:folders end

    app.config(['LoopBackResourceProvider', function(LoopBackResourceProvider) {
        LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
    }]);

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                template: require('./views/home.html'),
                controller: fullname + '.home as vm'
            })
            .state('search', {
                url: '/search',
                template: require('./views/search.html'),
                controller: fullname + '.search as vm'
            })
            .state('create', {
                url: '/create',
                template: require('./views/create.html'),
                controller: fullname + '.create as vm'
            })
            .state('profile', {
                url: '/profile',
                template: require('./views/profile.html'),
                controller: fullname + '.profile as vm'
            })
            .state('patient', {
                url: '/patient/:id',
                template: require('./views/patient.html'),
                controller: fullname + '.patient as vm'
            })
            .state('visit', {
                url: '/visit/:id',
                template: require('./views/visit.html'),
                controller: fullname + '.visit as vm'
            });
    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};
