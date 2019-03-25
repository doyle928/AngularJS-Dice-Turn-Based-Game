(function () {
    var gameoverComponent = {
        templateUrl: "Partials/game-over.html",
        controller: function (GameService, $location) {
            const $ctrl = this;

            $ctrl.playAgain = function () {
                $location.path("/map1")
            }
        }
    };
    angular.module("App").component("gameoverComponent", gameoverComponent);
})();