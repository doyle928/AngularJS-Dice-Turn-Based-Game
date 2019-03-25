(function () {
    var experienceComponent = {
        templateUrl: "Partials/experience.html",
        controller: function (GameService, $location) {
            const $ctrl = this;

            $ctrl.player = GameService.getPlayer();
            let currentLevel = $ctrl.player.level;
            $ctrl.enemy;

            $ctrl.currentEnemy = GameService.getCurrentEnemy();
            if ($ctrl.currentEnemy == "O") {
                $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);
            } else if ($ctrl.currentEnemy == "Y") {
                $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);
            }

            let playerExpLevelMarks = {
                one: 100,
                two: 200,
                three: 400,
                four: 700,
                five: 1000
            };

            $("#experience").attr("value", $ctrl.player.currentExp);

            if ($ctrl.player.level == 1) {
                $("#experience").attr("max", playerExpLevelMarks.one);
            } else if ($ctrl.player.level == 2) {
                $("#experience").attr("max", playerExpLevelMarks.two);
            } else if ($ctrl.player.level == 3) {
                $("#experience").attr("max", playerExpLevelMarks.three);
            } else if ($ctrl.player.level == 4) {
                $("#experience").attr("max", playerExpLevelMarks.four);
            } else if ($ctrl.player.level == 5) {
                $("#experience").attr("max", playerExpLevelMarks.five);
            }

            function randNumLevel1() {
                return Math.floor(Math.random() * 40) + 100;
            }

            function randNumLevel2() {
                return Math.floor(Math.random() * 80) + 100;
            }

            function randNumLevel3() {
                return Math.floor(Math.random() * 120) + 75;
            }

            function randNumLevel4() {
                return Math.floor(Math.random() * 160) + 100;
            }

            function randNumLevel5() {
                return Math.floor(Math.random() * 200) + 125;
            }

            setTimeout(function () {
                if ($ctrl.enemy.level == 1) {
                    GameService.updatePlayerExp(randNumLevel1());
                } else if ($ctrl.enemy.level == 2) {
                    GameService.updatePlayerExp(randNumLevel2());
                } else if ($ctrl.enemy.level == 3) {
                    GameService.updatePlayerExp(randNumLevel3());
                } else if ($ctrl.enemy.level == 4) {
                    GameService.updatePlayerExp(randNumLevel4());
                } else if ($ctrl.enemy.level == 5) {
                    GameService.updatePlayerExp(randNumLevel5());
                }
                $ctrl.player = GameService.getPlayer();
                $("#experience").attr("value", $ctrl.player.currentExp);
                console.log(currentLevel, $ctrl.player.level);
                if (currentLevel != $ctrl.player.level) {
                    $("#level-up").css("display", "block");
                }
            }, 1200);

            $ctrl.continue = function () {
                $location.path("/map1");
            };
        }
    };
    angular.module("App").component("experienceComponent", experienceComponent);
})();