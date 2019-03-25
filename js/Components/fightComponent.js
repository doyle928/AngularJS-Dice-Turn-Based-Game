(function () {
    var fightComponent = {
        templateUrl: "Partials/fight.html",
        controller: function (GameService, $interval) {
            const $ctrl = this;

            $ctrl.playerTurn = GameService.getPlayerTurn();

            $interval(function () {
                $ctrl.playerTurn = GameService.getPlayerTurn();
            }, 500);

            // $ctrl.playerTurn.watch('', function (id, oldval, newval) {
            //     console.log("player-turn changed from " + oldval + " to " + newval);
            //     return newval;
            // });

            console.log("fight", $ctrl.playerTurn);

            // $ctrl.enemyHealth = 200;
            // $ctrl.enemyDiceAmount = 1;
            // $ctrl.enemyDice = [];

            // $ctrl.playerHealth = GameService.sendPlayerHP();
            // $ctrl.playerDiceAmount = GameService.sendPlayerDiceAmount();
            // $ctrl.playerDice = [];

            // function randomDice() {
            //     return Math.floor(Math.random() * 6) + 1;
            // }

            // $("#enemy-health-button").click(function () {

            //     $ctrl.enemyDice.push(randomDice());

            //     $ctrl.playerDice.push(randomDice());
            //     $ctrl.playerDice.push(randomDice());

            //     console.log($ctrl.enemyDice, $ctrl.playerDice);

            //     $ctrl.enemyHealth = $ctrl.enemyHealth - ($ctrl.playerDice[0] + $ctrl.playerDice[1]);
            //     $ctrl.enemyHealth = $ctrl.enemyHealth + "px";
            //     $("#enemy-health-progress").css("width", $ctrl.enemyHealth);
            //     $ctrl.enemyHealth = parseInt($ctrl.enemyHealth);

            //     $ctrl.playerHealth = $ctrl.playerHealth - $ctrl.enemyDice[0];
            //     $ctrl.playerHealth = $ctrl.playerHealth + "px";
            //     $("#player-health-progress").css("width", $ctrl.playerHealth);
            //     $ctrl.playerHealth = parseInt($ctrl.playerHealth);

            //     $ctrl.playerDice = [];
            //     $ctrl.enemyDice = [];
            // })
        }
    };
    angular.module("App").component("fightComponent", fightComponent);
})();