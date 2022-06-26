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
                templateUrl: 'product_editor/product_add.html',
                controller: 'productEditorController'
            })
            .when('/product_add', {
                templateUrl: 'product_add/product_add.html',
                controller: 'productAddController'
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

    // $scope.increaseCost = function (product) {
    //     product.cost++;
    //     $http.put(contextPath + '/products', product).then(function (response) {
    //         $scope.getProductsPage()
    //     });
    // };
    //
    // $scope.decreaseCost = function (product) {
    //     product.cost--;
    //     $http.put(contextPath + '/products', product).then(function (response) {
    //         $scope.getProductsPage()
    //     });
    // };
    //
    // $scope.deleteProduct = function (product) {
    //     $http.delete(contextPath + '/products/' + product.id).then(function (response) {
    //         $scope.getProductsPage()
    //     });
    // };
    //
    // $scope.addNewProduct = function () {
    //     $http.post(contextPath + '/products', $scope.newProduct)
    //         .then(function successCallback(response) {
    //             $scope.getProductsPage(currentPageIndex)
    //             $scope.newProduct = null;
    //             }, function failCallback(response) {
    //                 alert(response.data.message);
    //             }
    //         );
    // };

});
