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
  function HomeCtrl(data, $http, $scope) {
    /*jshint validthis:true */
    var home = this;
    this.data = data.data;
    $scope.newPoemForm = {};
    $scope.newPoemForm.poem = "";
    $scope.newPoemForm.author = "";
     firstLoad();
  
  function firstLoad()
  {
      $http({
        url: 'http://client.yahon.ru/basic/web/index.php/poetry',
        method: "GET",
        //params:"date:" + Date.now(),
        
        withCredentials: false,
        headers: {
                    'Content-Type': 'application/json; charset=utf-8'
        }
    }).success(function(data) {
    $scope.poems = data;
  });
  $scope.newPoemForm.poem = "";
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
       var responsePromise = $http.post("http://client.yahon.ru/basic/web/index.php/poetry/create", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
          console.log(dataFromServer.title);
          append(dataObject);
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
     }
    
  }
  
  
  

  angular.module('home', [])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);
})();
