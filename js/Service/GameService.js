(function () {
    function GameService() {

        let playerTurn = true;
        let currentEnemy;
        let fightState = false; //check to see if currently in a fight

        let player = {
            "startHealth": 40,
            "health": 40,
            "level": 1,
            "currentExp": 0,
            "diceAmnt": 2,
            "skills": {
                "attack": {
                    "name": "attack",
                    "description": "do same dmg as dice value"
                },
                "heal": {
                    "name": "heal",
                    "description": "max 3"
                },
                "attack2": {
                    "name": "attack 2",
                    "description": "do 5 points of dmg, requires a 3"
                }
            }
        }

        let playerExpLevelMarks = {
            "one": 100,
            "two": 200,
            "three": 400,
            "four": 700,
            "five": 1000
        }

        let enemyO = {
            "name": "O",
            "startHealth": 36,
            "health": 36,
            "level": 1,
            "diceAmnt": 1,
            "skills": {
                "attack": {
                    "name": "attack",
                    "description": "do same dmg as dice value"
                }
            }
        }

        let enemyY = {
            "name": "Y",
            "startHealth": 20,
            "health": 20,
            "level": 2,
            "diceAmnt": 2,
            "skills": {
                "doubleDmg": {
                    "name": "double dmg",
                    "description": "Do 10 damage, requires 5"
                },
                "heal": {
                    "name": "heal",
                    "description": "max 3"
                }
            },
            "state": "alive"
        }
        let enemyZ = {
            "name": "Z",
            "startHealth": 30,
            "health": 30,
            "level": 3,
            "diceAmnt": 3,
            "skills": {
                "attack": {
                    "name": "attack",
                    "description": "do same dmg as dice value"
                },
                "doubleDmg": {
                    "name": "double dmg",
                    "description": "Do 10 damage, requires 5"
                },
                "heal": {
                    "name": "heal",
                    "description": "max 3"
                }
            },
            "state": "alive"
        }

        return {
            updatePlayerTurn: updatePlayerTurn,
            getPlayerTurn: getPlayerTurn,
            getCurrentEnemy: getCurrentEnemy,
            getFightState: getFightState,
            updateFightState: updateFightState,
            getPlayerExp: getPlayerExp,
            updatePlayerExp: updatePlayerExp,
            updateCurrentEnemy: updateCurrentEnemy,
            updatePlayerHP: updatePlayerHP,
            getPlayerHP: getPlayerHP,
            getPlayer: getPlayer,
            getEnemy: getEnemy,
            updateEnemyO: updateEnemyO,
            updateEnemyOHP: updateEnemyOHP,
            updateEnemyY: updateEnemyY,
            updateEnemyYHP: updateEnemyYHP
        }

        function updatePlayerTurn(arg) {
            playerTurn = arg;
        }

        function getPlayerTurn() {
            return playerTurn;
        }

        function getCurrentEnemy() {
            return currentEnemy;
        }

        function updateCurrentEnemy(enemy) {
            currentEnemy = enemy;
        }

        function getFightState() {
            return fightState;
        }

        function getPlayerExp() {
            return player.currentExp;
        }

        function updatePlayerExp(amount) {
            player.currentExp += amount;
            if (player.currentExp >= 100) {
                player.currentExp -= 100;
                player.level = 2;
                if (player.currentExp >= 200) {
                    player.currentExp -= 200;
                    player.level = 3;
                    if (player.currentExp >= 400) {
                        player.currentExp -= 400;
                        player.level = 4;
                        if (player.currentExp >= 700) {
                            player.currentExp -= 700;
                            player.level = 5;
                        }
                    }
                }
            }
        }

        function updateFightState(state) {
            fightState = state;
        }

        function updatePlayerHP(amount) {
            if (player.startHealth < (player.health - amount)) {
                player.health = player.startHealth;
            } else if ((player.health - amount) < 0) {
                player.health = 0;
            } else {
                player.health -= amount;
            }
        }

        function getPlayerHP() {
            return player.health;
        }

        function getPlayer() {
            return player;
        }

        function updatePlayer() {

        }

        function getEnemy(enemy) {
            if (enemy == "O") {
                return enemyO;
            } else if (enemy == "Y") {
                return enemyY;
            }
        }

        function updateEnemyO(health, diceAmnt, state) {
            enemyO.health -= health;
            enemyO.diceAmnt += diceAmnt;
            enemyO.state = state;
        }

        function updateEnemyOHP(amount) {
            if (enemyO.startHealth < (enemyO.health - amount)) {
                enemyO.health = enemyO.startHealth;
            } else if ((enemyO.health - amount) < 0) {
                enemyO.health = 0;
            } else {
                enemyO.health -= amount;
            }
        }

        function updateEnemyY(health, diceAmnt, state) {
            enemyO.health -= health;
            enemyO.diceAmnt += diceAmnt;
            enemyO.state = state;
        }

        function updateEnemyYHP(health) {
            if (enemyY.startHealth < (enemyY.health - health)) {
                enemyY.health = enemyY.startHealth;
            } else if ((enemyY.health - health) < 0) {
                enemyY.health = 0;
            } else {
                enemyY.health -= health;
            }
        }



    }
    angular.module("App").factory("GameService", GameService);
})();