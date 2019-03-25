(function () {
    angular.module("App").config(function ($routeProvider) {
        $routeProvider
            .when("/map1", {
                template: "<map1-component></map1-component>"
            })
            .when("/fight", {
                template: "<fight-component></fight-component>"
            })
            .when("/experience", {
                template: "<experience-component></experience-component>"
            })
            .when("/game-over", {
                template: "<gameover-component></gameover-component"
            })
            .otherwise({
                redirectTo: "/map1"
            });
    });
})();