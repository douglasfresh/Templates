// AngularJS Application
var app = angular.module( "app", ['ngRoute'] );

// Contentul API Client
var client = contentful.createClient({
  // ID of Space
  space: '4sukcz8ms49e',

  // A valid access token within the Space
  accessToken: '807e586395e27121d7604f1be565c98a1bb444a36711ddf89fc1e7c74d812c8e',

  // Enable or disable SSL. Enabled by default.
  secure: true,

  // Set an alternate hostname, default shown.
  host: 'cdn.contentful.com',

  // Resolve links to entries and assets
  resolveLinks: true,

});

// Contenful Controller
app.controller('ContentfulCtrl', ['$scope', '$q', '$http', '$routeParams', function($scope, $q, $http, $routeParams) {

  // View Model
  var vm = this;

  // Contentful Entries
  var entries = $q.when(client.entries());

  vm.sections = Array();
  vm.menu = Array();

  entries.then(function(entries) {

    entries.forEach(function(entry) {

      switch(entry.sys.contentType.sys.id) {
        case "aside":
          vm.aside = entry.fields;
          break;

        case "brand":
          vm.brand = entry.fields;
          break;

        case "button":
          vm.menu.push(entry.fields);
          break;

        case "design":
          vm.design = entry.fields;
          break;

        case "footer":
          vm.footer = entry.fields;
          break;

        case "header":
          vm.header = entry.fields;
          break;

        case "navigation":
          vm.nav = entry.fields;
          break;

        case "section":
          vm.sections.push(entry.fields);
          break;

        default:
          break;
      } 

    });

  });

}]);

app.filter("getFont", function() {

  //convert + to space
  return function(input){
    if(input) return input.replace(/\s+/g," "); 
  }

});