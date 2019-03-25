(function () {
    var enemyturnComponent = {
        templateUrl: "Partials/enemy-turn.html",
        controller: function (GameService, $compile, $scope, $location) {
            const $ctrl = this;

            console.log("enemy");

            // $ctrl.enemyHealth = GameService.getEnemyHP();
            // $ctrl.enemyDiceAmount = GameService.getEnemyDiceAmount();
            $ctrl.enemyDice = [];
            $ctrl.currentEnemy = GameService.getCurrentEnemy();
            $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);

            $ctrl.player = GameService.getPlayer();

            let elUl = $("#enemy-dice-list");
            let selectedDiceValue;
            let selectedDiceID;

            let dice1 = '<li ng-click="$ctrl.diceSelect($event)" data-value="1"><image src="../../style/images/dice/dice1.png"></li>';
            let dice2 = '<li ng-click="$ctrl.diceSelect($event)" data-value="2"><image src="../../style/images/dice/dice2.png"></li>';
            let dice3 = '<li ng-click="$ctrl.diceSelect($event)" data-value="3"><image src="../../style/images/dice/dice3.png"></li>';
            let dice4 = '<li ng-click="$ctrl.diceSelect($event)" data-value="4"><image src="../../style/images/dice/dice4.png"></li>';
            let dice5 = '<li ng-click="$ctrl.diceSelect($event)" data-value="5"><image src="../../style/images/dice/dice5.png"></li>';
            let dice6 = '<li ng-click="$ctrl.diceSelect($event)" data-value="6"><image src="../../style/images/dice/dice6.png"></li>';

            function randomDice() {
                return Math.floor(Math.random() * 6) + 1;
            }

            for (let i = 1; i <= $ctrl.enemy.diceAmnt; i++) {
                $ctrl.enemyDice.push(randomDice());
            }

            console.log($ctrl.enemyDice);

            $ctrl.enemyDice.forEach(number => {
                if (number == 1) {
                    let linkDice1 = $compile(dice1);
                    let contentDice1 = linkDice1($scope);
                    elUl.append(contentDice1);
                } else if (number == 2) {
                    let linkDice2 = $compile(dice2);
                    let contentDice2 = linkDice2($scope);
                    elUl.append(contentDice2);
                } else if (number == 3) {
                    let linkDice3 = $compile(dice3);
                    let contentDice3 = linkDice3($scope);
                    elUl.append(contentDice3);
                } else if (number == 4) {
                    let linkDice4 = $compile(dice4);
                    let contentDice4 = linkDice4($scope);
                    elUl.append(contentDice4);
                } else if (number == 5) {
                    let linkDice5 = $compile(dice5);
                    let contentDice5 = linkDice5($scope);
                    elUl.append(contentDice5);
                } else {
                    let linkDice6 = $compile(dice6);
                    let contentDice6 = linkDice6($scope);
                    elUl.append(contentDice6);
                }
            });

            // in set timeout function run enemy skills check, and then skills one at a time based on which enemy
            // have each skill in its own function and call from set timeout

            let diceListEl = $("#enemy-dice-list li");
            for (let i = 0; i < diceListEl.length; i++) {
                diceListEl[i].setAttribute("data-id", i);
            }


            function attack(amount) {
                let health = $("#player-health").attr("value");
                $("#player-health").attr("value", health - amount);
                GameService.updatePlayerHP(amount);
                $ctrl.player = GameService.getPlayer();
            }

            function doubleDmg() {
                let health = $("#player-health").attr("value");
                $("#player-health").attr("value", health - 10);
                GameService.updatePlayerHP(10);
                $ctrl.player = GameService.getPlayer();
            }

            function heal(amount) {
                if (amount <= 3) {
                    let health = parseInt($("#enemy-health").attr("value"));
                    let maxHealth = parseInt($("#enemy-health").attr("max"));
                    if ($ctrl.currentEnemy == "O") {
                        if ((health + amount) >= maxHealth) {
                            $("#enemy-health").attr("value", maxHealth);
                            amount *= -1;
                            GameService.updateEnemyOHP(amount);
                        } else {
                            $("#enemy-health").attr("value", health + amount);
                            amount *= -1;
                            GameService.updateEnemyOHP(amount);
                        }
                    } else if ($ctrl.currentEnemy == "Y") {
                        if ((health + amount) >= maxHealth) {
                            $("#enemy-health").attr("value", maxHealth);
                            amount *= -1;
                            GameService.updateEnemyYHP(amount);
                        } else {
                            $("#enemy-health").attr("value", health + amount);
                            amount *= -1;
                            GameService.updateEnemyYHP(amount);
                        }
                    }
                    $ctrl.player = GameService.getPlayer();
                }
            }

            setTimeout(function () {
                console.log($ctrl.enemy);
                let healthCheck = Math.floor($ctrl.enemy.health / 3);
                if ($ctrl.enemy.health <= healthCheck && $ctrl.enemy.health < $ctrl.player.health) {
                    if ($ctrl.enemy.skills.hasOwnProperty("heal")) {
                        console.log($ctrl.enemy.skills.heal, " healing 1");
                        let haveHeal = true;
                        for (let i = 0; i < $ctrl.enemyDice.length; i++) {
                            if (haveHeal) {
                                if ($ctrl.enemyDice[i] == 3) {
                                    heal(3);
                                    let queryFindDice = '[data-id=\"' + i + '\"]';
                                    $(queryFindDice).remove();
                                    $ctrl.enemyDice.splice(i, 1);
                                    haveHeal = false;
                                } else if ($ctrl.enemyDice[i] == 2) {
                                    heal(2);
                                    let queryFindDice = '[data-id=\"' + i + '\"]';
                                    $(queryFindDice).remove();
                                    $ctrl.enemyDice.splice(i, 1);
                                    haveHeal = false;
                                } else if ($ctrl.enemyDice[i] == 1) {
                                    heal(1);
                                    let queryFindDice = '[data-id=\"' + i + '\"]';
                                    $(queryFindDice).remove();
                                    $ctrl.enemyDice.splice(i, 1);
                                    haveHeal = false;
                                }
                            }
                        }
                    }
                    // try to do most damage
                    if ($ctrl.enemy.skills.hasOwnProperty("doubleDmg")) {
                        console.log($ctrl.enemy.skills.doubleDmg, " double dmg 1");
                        let haveDoubleDmg = true;
                        for (let i = 0; i < $ctrl.enemyDice.length; i++) {
                            if (haveDoubleDmg) {
                                if ($ctrl.enemyDice[i] == 5) {
                                    doubleDmg();
                                    haveDoubleDmg = false;
                                    let queryFindDice = '[data-id=\"' + i + '\"]';
                                    $(queryFindDice).remove();
                                    $ctrl.enemyDice.splice(i, 1);
                                }
                            }
                        }
                    }
                    if ($ctrl.enemy.skills.hasOwnProperty("attack")) {
                        console.log($ctrl.enemy.skills.attack, " attack 1");
                        attack(Math.max(...$ctrl.enemyDice));
                        let diceID = $ctrl.enemyDice.indexOf(Math.max(...$ctrl.enemyDice));
                        $ctrl.enemyDice.splice(diceID, 1);
                    }
                } else { // if ($ctrl.enemy.health <= healthCheck && $ctrl.enemy.health > $ctrl.player.health) {
                    // prioritize attack if hp > player.hp
                    console.log("prioritizing attack");
                    if ($ctrl.enemy.skills.hasOwnProperty("doubleDmg")) {
                        console.log($ctrl.enemy.skills.doubleDmg, "double dmg 2");
                        let haveDoubleDmg = true;
                        for (let i = 0; i < $ctrl.enemyDice.length; i++) {
                            if (haveDoubleDmg) {
                                if ($ctrl.enemyDice[i] == 5) {
                                    doubleDmg();
                                    haveDoubleDmg = false;
                                    let queryFindDice = '[data-id=\"' + i + '\"]';
                                    $(queryFindDice).remove();
                                    $ctrl.enemyDice.splice(i, 1);
                                }
                            }
                        }
                    }
                    if ($ctrl.enemy.skills.hasOwnProperty("attack")) {
                        console.log($ctrl.enemy.skills.attack, " attack 2");
                        console.log($ctrl.enemyDice, Math.max(...$ctrl.enemyDice))
                        attack(Math.max(...$ctrl.enemyDice));
                        let diceID = $ctrl.enemyDice.indexOf(Math.max(...$ctrl.enemyDice));
                        $ctrl.enemyDice.splice(diceID, 1);
                    }
                    if ($ctrl.enemy.skills.hasOwnProperty("heal")) {
                        console.log($ctrl.enemy.skills.heal, "healing 2");
                        let haveHeal = true;
                        for (let i = 0; i < $ctrl.enemyDice.length; i++) {
                            if (haveHeal) {
                                if ($ctrl.enemyDice[i] == 3) {
                                    heal(3);
                                    let queryFindDice = '[data-id=\"' + i + '\"]';
                                    $(queryFindDice).remove();
                                    $ctrl.enemyDice.splice(i, 1);
                                    haveHeal = false;
                                } else if ($ctrl.enemyDice[i] == 2) {
                                    heal(2);
                                    let queryFindDice = '[data-id=\"' + i + '\"]';
                                    $(queryFindDice).remove();
                                    $ctrl.enemyDice.splice(i, 1);
                                    haveHeal = false;
                                } else if ($ctrl.enemyDice[i] == 1) {
                                    heal(1);
                                    let queryFindDice = '[data-id=\"' + i + '\"]';
                                    $(queryFindDice).remove();
                                    $ctrl.enemyDice.splice(i, 1);
                                    haveHeal = false;
                                }
                            }
                        }
                        console.log($("#enemy-health").attr("value"));
                    }
                }
                setTimeout(function () {
                    GameService.updatePlayerTurn(true);
                }, 2000);

                // GameService.updatePlayerHP($ctrl.enemyDice[0]);
                // // $ctrl.player.health = GameService.getPlayerHP();
                // let health = $("#player-health").attr("value");
                // $("#player-health").attr("value", health - $ctrl.enemyDice[0]);
                // let queryFindDice = '[data-value=\"' + $ctrl.enemyDice[0] + '\"]';
                // $(queryFindDice).remove();
                // $ctrl.enemyDice = [];
                // selectedDiceValue = null;
                // selectedDiceID = null;
                // setTimeout(function () {
                //     GameService.updatePlayerTurn(true);
                // }, 1000);
            }, 1000);


        }
    };
    angular.module("App").component("enemyturnComponent", enemyturnComponent);
})();