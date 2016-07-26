'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',
    [
        'ngRoute',
        'product',
        'detail'
    ]).
    config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider.when('/detail/:productId', {
            templateUrl: 'Detail/Detail.html',
            controller: 'detailsCtrl'
        });
        $routeProvider.when('/index', {
            templateUrl: 'Product/product.html',
            controller: 'productCtrl'
        });
        $routeProvider.when('/add', {
            templateUrl: 'Product/AddProduct.html',
            controller: 'productCtrl'
        });
        $routeProvider.when('/edit/:productId', {
            templateUrl: 'Product/AddProduct.html',
            controller: 'productCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/index'});
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
    }]).
    controller('mainCtrl', ['$scope','$location', function($scope,$location) {

    }]).
    service('myAppService', function () {
        var uid=1000;
        var products=[{
            "id":1,
            "Name":"Apple",
            "Cost":100,
            "TotalRating":5,
            "Rating":3,
            "IsEditable":false
        },
        {
            "id":2,
            "Name":"Mango",
            "Cost":120,
            "TotalRating":5,
            "Rating":2,
            "IsEditable":false
        },
        {
            "id":3,
            "Name":"Grapes",
            "Cost":200,
            "TotalRating":5,
            "Rating":1,
            "IsEditable":false
        }];
        //simply returns the contacts list
        this.list = function () {
            return products;
        };
        this.getProduct=function(productId){
            for (var i in products) {
                if (products[i].id == productId) {
                    return products[i];
                }
            }
        }
        this.saveRating = function(productId,rating){
            if (productId == null) {
                return;
            }
            for (var i in products) {
                if (products[i].id == productId) {
                    products[i].Rating = rating;
                    return;
                }
            }
        }
        this.saveProduct = function(product){
            if (product.id == null) {
                //if this is new contact, add it in contacts array
                product.id = uid++;
                product.TotalRating = 5;
                product.IsEditable = false;
                products.push(product);
            } else {
                //for existing contact, find this contact using id
                //and update it.
                for (var i in products) {
                    if (products[i].id == product.id) {
                        products[i].IsEditable = false;
                        products[i] = product;
                        return;
                    }
                }
            }
        }

    });