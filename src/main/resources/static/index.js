(function () {
    angular
        .module('market-app', ['ngRoute'])
        .config(config)
        .run(run);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'welcome/welcome.html',
                controller: 'welcomeController'
            })
            .when('/market', {
                templateUrl: 'market/market.html',
                controller: 'marketController'
            })
            .when('/product_editor/:productId', {
                templateUrl: 'product_editor/product_editor.html',
                controller: 'productEditorController'
            })
            .when('/product_add', {
                templateUrl: 'product_add/product_add.html',
                controller: 'productAddController'
            })
            .when('/cart', {
                templateUrl: 'cart/cart.html',
                controller: 'cartController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
    function run ($rootScope, $http) {

    }

})();

angular.module('market-app').controller('indexController', function ($rootScope, $scope, $http) {
    const contextPath = 'http://localhost:8189/market/api/v1';

});
