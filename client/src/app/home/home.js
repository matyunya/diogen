(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'src/common/footer.tpl.html',
            controller: 'FooterCtrl'
          }
        }
      })
      .state('root.home', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'src/app/home/home.tpl.html',
            controller: 'HomeCtrl as home',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      });
  }
  /**
   * @name  HomeCtrl
   * @description Controller
   */
  function HomeCtrl(data, $http, $scope, $resource) {
    /*jshint validthis:true */
    var home = this;
    this.data = data.data;
    var PoetryAPI = $resource('http://client.yahon.ru/basic/web/index.php/poetry');
    var PostAPI = $resource('http://client.yahon.ru/basic/web/index.php/poetry/create');
    
    $scope.newPoemForm = {};
    $scope.newPoemForm.poem = "";
    $scope.newPoemForm.author = "";
    
     firstLoad();
     
     
  
  function firstLoad()
  {
    PoetryAPI.query(function(data) {
  // Handle successful response here
    $scope.poems = data;
    }, function(err) {
    // Handle error here
    });
  
  }
  
  function append(dataObject)
  {
      
    $scope.poems.push(dataObject);
    $scope.newPoemForm.poem = "";
    $scope.newPoemForm.author = "";
  
  }
  
  
    $scope.newPoemForm.submitTheForm = function(item, event) {
       console.log("--> Submitting form");
       var dataObject = {
          "poem" : $scope.newPoemForm.poem,
          "author" : $scope.newPoemForm.author,
       };
       PostAPI.save(dataObject, function() {
        append(dataObject);
      }, function() {
      alert("Submitting form failed!");
      });
    }
    
  }
  
  
  

  angular.module('home', ['ngResource'])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);
})();
