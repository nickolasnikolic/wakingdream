var wdApp = angular.module('gresumeApp', ['ui.router', 'ngSanitize', 'angular.filter'])
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
        onEnter: function($state) {
          console.log('home');
          //if the credentials are not set
          //route back to
        }
      })

    }
  ]);
