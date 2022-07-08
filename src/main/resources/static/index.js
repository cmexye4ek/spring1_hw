(function () {
    angular
        .module('market-app', ['ngRoute', 'ngStorage'])
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
                templateUrl: 'product_editor/registration.html',
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
            .when('/registration', {
                templateUrl: 'registration/registration.html',
                controller: 'registrationController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function run($rootScope, $http, $localStorage) {
        if ($localStorage.webMarketUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.webMarketUser.token;
        }
    }

})();

angular.module('market-app').controller('indexController', function ($rootScope, $scope, $http, $localStorage, $location) {
    const contextPath = 'http://localhost:8189/market/api/v1';

    $rootScope.tryToAuth = function () {
        $http.post(contextPath + '/auth', $scope.user)
            .then(function successCallback(response) {
                if (response.data.token) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $localStorage.webMarketUser = {
                        username: $scope.user.username,
                        token: response.data.token,
                        role: response.data.role
                    };
                    console.log(response.data.role)
                    $scope.user.username = null;
                    $scope.user.password = null;
                }
            }, function errorCallback(response) {
                alert(response.data.messages);
            });
    };

    $scope.tryToLogout = function () {
        $scope.clearUser();
        if ($scope.user.username) {
            $scope.user.username = null;
        }
        if ($scope.user.password) {
            $scope.user.password = null;
        }
    };

    $scope.clearUser = function () {
        delete $localStorage.webMarketUser;
        $http.defaults.headers.common.Authorization = '';
    };

    $rootScope.isUserLoggedIn = function () {
        if ($localStorage.webMarketUser) {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isUserAdmin = function () {
        if ($rootScope.isUserLoggedIn() && $localStorage.webMarketUser.role === 'ADMIN') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isUserManager = function () {
        if ($rootScope.isUserLoggedIn() && $localStorage.webMarketUser.role === 'MANAGER') {
            return true;
        } else {
            return false;
        }
    };

    $scope.navToRegisterPage = function () {
        $location.path('/registration');
    }
});
