(function () {
    var map1Component = {
        templateUrl: "Partials/map1.html",
        controller: function (GameService, $location) {
            const $ctrl = this;
            let enemyO = "O";
            let enemyY = "Y";

            $ctrl.fightEnemyO = function () {
                GameService.updateCurrentEnemy(enemyO);
                console.log("chose O");
                $location.path("/fight");
            };
            $ctrl.fightEnemyY = function () {
                GameService.updateCurrentEnemy(enemyY);
                console.log("chose Y");
                $location.path("/fight");
            };
        }
    };
    angular.module("App").component("map1Component", map1Component);
})();