(function () {
    var playerturnComponent = {
        templateUrl: "Partials/player-turn.html",
        controller: function (GameService, $compile, $scope, $location) {
            const $ctrl = this;
            console.log("player");
            // $ctrl.enemyHealth = GameService.getEnemyHP();
            // $ctrl.enemyDiceAmount = GameService.getEnemyDiceAmount();
            let fightState = GameService.getFightState();
            $ctrl.currentEnemy = GameService.getCurrentEnemy();
            console.log(fightState);
            if (!fightState) {
                if ($ctrl.currentEnemy == "O") {
                    $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);
                    $("#enemy-health").attr("value", $ctrl.enemy.health);
                    $("#enemy-health").attr("max", $ctrl.enemy.health);
                    console.log("fighting O", $ctrl.enemy);
                } else if ($ctrl.currentEnemy == "Y") {
                    $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);
                    $("#enemy-health").attr("value", $ctrl.enemy.health);
                    $("#enemy-health").attr("max", $ctrl.enemy.health);
                    console.log("fighting Y", $ctrl.enemy);
                }
                GameService.updateFightState(true);
            } else {
                $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);
            }

            // $ctrl.playerHealth = GameService.getPlayerHP();
            // $ctrl.playerDiceAmount = GameService.getPlayerDiceAmount();
            $ctrl.player = GameService.getPlayer();
            $ctrl.playerDice = [];

            let elUl = $("#player-dice-list");
            let selectedDiceValue;
            let selectedDiceID;

            let dice1 =
                '<li ng-click="$ctrl.diceSelect($event)" data-value="1"><image src="../../style/images/dice/dice1.png"></li>';
            let dice2 =
                '<li ng-click="$ctrl.diceSelect($event)" data-value="2"><image src="../../style/images/dice/dice2.png"></li>';
            let dice3 =
                '<li ng-click="$ctrl.diceSelect($event)" data-value="3"><image src="../../style/images/dice/dice3.png"></li>';
            let dice4 =
                '<li ng-click="$ctrl.diceSelect($event)" data-value="4"><image src="../../style/images/dice/dice4.png"></li>';
            let dice5 =
                '<li ng-click="$ctrl.diceSelect($event)" data-value="5"><image src="../../style/images/dice/dice5.png"></li>';
            let dice6 =
                '<li ng-click="$ctrl.diceSelect($event)" data-value="6"><image src="../../style/images/dice/dice6.png"></li>';

            function randomDice() {
                return Math.floor(Math.random() * 6) + 1;
            }

            for (let i = 1; i <= $ctrl.player.diceAmnt; i++) {
                $ctrl.playerDice.push(randomDice());
            }

            $ctrl.playerDice.forEach(number => {
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

            // for (let i = 1; i <= $ctrl.playerDiceAmount; i++) {
            //     $ctrl.playerDice.push(randomDice());
            // }

            let diceListEl = $("#player-dice-list li");
            for (let i = 0; i < diceListEl.length; i++) {
                diceListEl[i].setAttribute("data-id", i);
            }

            console.log($ctrl.playerDice);

            $ctrl.diceSelect = function (e) {
                console.log("clicked");
                $(e.currentTarget).css("background-color", "#8ca6fc");
                selectedDiceValue = $(e.currentTarget).data("value");
                selectedDiceID = $(e.currentTarget).data("id");
                console.log(selectedDiceValue, selectedDiceID);
            };
            $ctrl.diceSelect = function (e) {
                console.log("clicked");
                $(e.currentTarget).css("background-color", "#8ca6fc");
                selectedDiceValue = $(e.currentTarget).data("value");
                selectedDiceID = $(e.currentTarget).data("id");
                console.log(selectedDiceValue, selectedDiceID);
            };

            document.addEventListener("click", (e) => {
                const flyoutElement = $("#player-dice-list > li > img");
                // let targetElement = evt.target; // clicked element

                if (e.target.closest("img") || e.target.closest(".skill")) return;
                else {
                    let queryFindDice = '[data-id="' + selectedDiceID + '"]';
                    $(queryFindDice).css("background-color", "#8ca6fc00");
                    selectedDiceValue = null;
                    selectedDiceID = null;
                    console.log("clicking out flyout element")

                }
                // This is a click outside.

            });

            $ctrl.singleAttack = function () {
                if (selectedDiceValue) {
                    if ($ctrl.currentEnemy == "O") {
                        GameService.updateEnemyOHP(selectedDiceValue);
                    } else if ($ctrl.currentEnemy == "Y") {
                        GameService.updateEnemyYHP(selectedDiceValue);
                    }
                    $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);
                    let health = $("#enemy-health").attr("value");
                    $("#enemy-health").attr("value", (health - selectedDiceValue));
                    console.log($("#enemy-health").attr("value"));
                    // $ctrl.playerDice = [];
                    // GameService.updatePlayerTurn(false);
                    let queryFindDice = '[data-id="' + selectedDiceID + '"]';
                    $(queryFindDice).remove();
                    $ctrl.playerDice.splice(selectedDiceID, 1);
                    selectedDiceValue = null;
                    selectedDiceID = null;
                }
            };

            $ctrl.heal = function () {
                if (selectedDiceValue <= 3) {
                    let queryFindDice = '[data-id="' + selectedDiceID + '"]';
                    selectedDiceValue *= -1;
                    console.log(selectedDiceValue);
                    GameService.updatePlayerHP(selectedDiceValue);
                    $ctrl.playerHealth = GameService.getPlayerHP();
                    let health = $("#player-health").attr("value");
                    let maxHealth = $("#player-health").attr("max");
                    if ((health - selectedDiceValue) > maxHealth) {
                        $("#player-health").attr("value", maxHealth);
                        $(queryFindDice).remove();
                        $ctrl.playerDice.splice(selectedDiceID, 1);
                        selectedDiceValue = null;
                        selectedDiceID = null;
                    } else {
                        $("#player-health").attr("value", health - selectedDiceValue);
                        // $ctrl.playerDice = [];
                        // GameService.updatePlayerTurn(false);
                        $(queryFindDice).remove();
                        $ctrl.playerDice.splice(selectedDiceID, 1);
                        selectedDiceValue = null;
                        selectedDiceID = null;
                    }
                }
            };

            $ctrl.attack2 = function () {
                if (selectedDiceValue == 3) {
                    if ($ctrl.currentEnemy == "O") {
                        GameService.updateEnemyOHP(5);
                        $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);
                    } else if ($ctrl.currentEnemy == "Y") {
                        GameService.updateEnemyYHP(5);
                        $ctrl.enemy = GameService.getEnemy($ctrl.currentEnemy);
                    }
                    let health = $("#enemy-health").attr("value");
                    $("#enemy-health").attr("value", health - selectedDiceValue);
                    // $ctrl.playerDice = [];
                    // GameService.updatePlayerTurn(false);
                    let queryFindDice = '[data-id="' + selectedDiceID + '"]';
                    $(queryFindDice).remove();
                    $ctrl.playerDice.splice(selectedDiceID, 1);
                    selectedDiceValue = null;
                    selectedDiceID = null;
                }
            };

            $ctrl.bump = function () {
                if (selectedDiceValue) {
                    let queryFindDice = '[data-id="' + selectedDiceID + '"]';
                    selectedDiceValue += 1;
                    let newSrc = "../../style/images/dice/dice" + selectedDiceValue + ".png";
                    $(queryFindDice).css("background-color", "#8ca6fc00");
                    let diceEl = '<li ng-click="$ctrl.diceSelect($event)" data-id="' + selectedDiceID + '" data-value="' + selectedDiceValue + '"><image src="' + newSrc + '"></li>';
                    let linkDiceEl = $compile(diceEl);
                    let contentDiceEl = linkDiceEl($scope);
                    $(queryFindDice).replaceWith(contentDiceEl);
                    $ctrl.playerDice[selectedDiceID] = selectedDiceValue;
                    selectedDiceValue = null;
                    selectedDiceID = null;
                }
            }

            $ctrl.split = function () {
                if (selectedDiceValue) {
                    let queryFindDice = '[data-id="' + selectedDiceID + '"]';
                    if (selectedDiceValue != 1) {
                        // $(queryFindDice).css("background-color", "#8ca6fc00");
                        let splitValue1 = Math.floor(selectedDiceValue / 2);
                        let splitValue2;
                        // check if splitvalue * 2 = selectedDiceValue
                        if ((splitValue1 * 2) != selectedDiceValue) {
                            splitValue2 = splitValue1++;
                        } else {
                            splitValue2 = splitValue1;
                        }

                        let playerDiceSplit = $ctrl.playerDice.splice(selectedDiceID);
                        playerDiceSplit.shift();
                        $ctrl.playerDice[selectedDiceID] = splitValue1;
                        $ctrl.playerDice.push(splitValue2);
                        $ctrl.playerDice = $ctrl.playerDice.concat(playerDiceSplit);

                        $("#player-dice-list").empty();

                        $ctrl.playerDice.forEach(number => {
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

                        let diceListEl = $("#player-dice-list li");
                        for (let i = 0; i < diceListEl.length; i++) {
                            diceListEl[i].setAttribute("data-id", i);
                        }
                        console.log($ctrl.playerDice, playerDiceSplit);
                        selectedDiceValue = null;
                        selectedDiceID = null;
                    } else {
                        $(queryFindDice).css("background-color", "#8ca6fc00");
                        selectedDiceValue = null;
                        selectedDiceID = null;
                    }
                }
            }

            $ctrl.reroll = function () {
                if (selectedDiceValue) {
                    let queryFindDice = '[data-id="' + selectedDiceID + '"]';
                    selectedDiceValue = randomDice();
                    let newSrc = "../../style/images/dice/dice" + selectedDiceValue + ".png";
                    $(queryFindDice).css("background-color", "#8ca6fc00");
                    let diceEl = '<li ng-click="$ctrl.diceSelect($event)" data-id="' + selectedDiceID + '" data-value="' + selectedDiceValue + '"><image src="' + newSrc + '"></li>';
                    let linkDiceEl = $compile(diceEl);
                    let contentDiceEl = linkDiceEl($scope);
                    $(queryFindDice).replaceWith(contentDiceEl);
                    $ctrl.playerDice[selectedDiceID] = selectedDiceValue;
                    selectedDiceValue = null;
                    selectedDiceID = null;
                }
            }

            $ctrl.enemyHealthCheck = function () {
                let health = $("#enemy-health").attr("value");
                if (health <= 0) {
                    $location.path("/experience");
                }
            }

            $ctrl.endTurn = function () {
                GameService.updatePlayerTurn(false);
            };

            // $ctrl.attack = function () {
            //     let amount = $ctrl.playerDice[0] + $ctrl.playerDice[1];
            //     GameService.updateEnemyHP(amount);
            //     $ctrl.enemyHealth = GameService.getEnemyHP();
            //     $ctrl.enemyHealth = $ctrl.enemyHealth + "%";
            //     $("#enemy-health-progress").css("width", $ctrl.enemyHealth);
            //     $ctrl.enemyHealth = parseInt($ctrl.enemyHealth);
            //     $ctrl.playerDice = [];
            //     GameService.updatePlayerTurn(false);
            // };
        }
    };
    angular.module("App").component("playerturnComponent", playerturnComponent);
})();