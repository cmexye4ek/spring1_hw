angular.module('market-app', []).controller('marketAppController', function ($scope, $http) {
    const contextPath = 'http://localhost:8189/market/api/v1';
    let currentPageIndex = 1;

    $scope.getProductsPage = function (pageIndex = 1) {
        // currentPageIndex = pageIndex;
        $http({
            url: contextPath + '/products',
            method: 'GET',
            params: {
                page: pageIndex
            }
        }).then(function (response) {
            console.log(response);
            $scope.productsPage = response.data;
            $scope.paginationArray = $scope.generatePagesIndexes(1, $scope.productsPage.totalPages);
        });
    };

    $scope.increaseCost = function (product) {
        product.cost++;
        $http.put(contextPath + '/products', product).then(function (response) {
            $scope.getProductsPage()
        });
    };

    $scope.decreaseCost = function (product) {
        product.cost--;
        $http.put(contextPath + '/products', product).then(function (response) {
            $scope.getProductsPage()
        });
    };

    $scope.deleteProduct = function (product) {
        $http.delete(contextPath + '/products/' + product.id).then(function (response) {
            $scope.getProductsPage()
        });
    };

    $scope.addNewProduct = function () {
        $http.post(contextPath + '/products', $scope.newProduct)
            .then(function successCallback(response) {
                $scope.getProductsPage(currentPageIndex)
                $scope.newProduct = null;
                }, function failCallback(response) {
                    alert(response.data.message);
                }
            );
    };

    $scope.generatePagesIndexes = function (startPage, endPage) {
        let arr = [];
        for (let i = startPage; i < endPage + 1; i++) {
            arr.push(i);
        }
        return arr;
    }

    $scope.nextPage = function () {
        currentPageIndex++;
        if (currentPageIndex > $scope.productsPage.totalPages) {
            currentPageIndex = $scope.productsPage.totalPages;
        }
        $scope.getProductsPage(currentPageIndex);
    }

    $scope.prevPage = function () {
        currentPageIndex--;
        if (currentPageIndex < 1) {
            currentPageIndex = 1;
        }
        $scope.getProductsPage(currentPageIndex);
    }
});
