function gameCtrl($scope, $timeout) {
    $scope.board = [];
    $scope.showError = false;
    $scope.showWinner = false;
    $scope.showTie = false;



    //Init Players
    var player1 = new Player("Player1", "X", "blue");
    var player2 = new Player("Player2", "0", "green");
    $scope.allPlayers = [player1, player2];
    player1.toggle();


    function Player(name, symbol, color) {
        this.name = name;
        this.score = 0;
        this.symbol = symbol;
        this.active = false;
        this.color = color;

        this.getName = function () {
            return name;
        };

        this.toggle = function () {
            this.active = !this.active;
        };
    }

    function Cell() {
        this.value = 'blank';

        this.isX = function () {
            return this.value === 'X';
        }

        this.isO = function () {
            return this.value === '0';
        }
    }

    function togglePlayers() {
        player1.toggle();
        player2.toggle();
    }

    $scope.initNewBoard = function() {
        //Init Game
        for (var i = 0; i < 3; i++) {
            $scope.board[i] = [];
            for (var j = 0; j < 3; j++) {
                var tempCell = new Cell();
                $scope.board[i][j] = tempCell;
            }
        }
    }
    //Init Board
    $scope.initNewBoard();

    function checkWinnerInRows() {
        for (var i = 0; i < 3; i++) {
            if($scope.board[i][0].value == 'X' && $scope.board[i][1].value == 'X' && $scope.board[i][2].value == 'X'){
                return player1;
            }
            else if($scope.board[i][0].value == '0' && $scope.board[i][1].value == '0' && $scope.board[i][2].value == '0'){
                return player2;
            }
            else{
                return "NoOne";
            }
        }
    }

    function checkWinnerInCols() {
        for (var i = 0; i < 3; i++) {
            if($scope.board[0][i].value == 'X' && $scope.board[1][i].value == 'X' && $scope.board[2][i].value == 'X'){
                return player1;
            }
            else if($scope.board[0][i].value == '0' && $scope.board[1][i].value == '0' && $scope.board[2][i].value == '0'){
                return player2;
            }
            else{
                return "NoOne";
            }
        }
    }

    function checkWinnerInDiagonalX() {
        var flag = true;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if(i === j){
                    if($scope.board[i][j].value != 'X'){
                        flag = false;
                    }
                }
            }
        }
        if(flag === true){
            return player1;
        }
        else{
            return "NoOne";
        }
    }

    function checkWinnerInDiagonalO() {
        var flag = true;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if(i === j){
                    if($scope.board[i][j].value != '0'){
                        flag = false;
                    }
                }
            }
        }
        if(flag === true){
            return player2;
        }
        else{
            return "NoOne";
        }
    }

    function checkWinner() {
        var winner1, winner2, winner3, winner4;
        winner1 = checkWinnerInRows();
        winner2 = checkWinnerInCols();
        winner3 = checkWinnerInDiagonalX();
        winner4 = checkWinnerInDiagonalO();
        if(winner1 !== "NoOne"){
            return winner1;
        }
        else if(winner2 !== "NoOne"){
            return winner2;
        }
        else if(winner3 !== "NoOne"){
            return winner3;
        }
        else if(winner4 !== "NoOne"){
            return winner4;
        }
        else return "NoOne";
     }

    function isBoardFull() {
        var flag = true;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if($scope.board[i][j].value === 'blank'){
                    flag = false;
                }
            }
        }
        return flag;
    }

    $scope.getActivePlayer = function () {
        if (player1.active == true)
            return player1;
        else return player2;
    }

    $scope.fillCell = function (player, cell) {
        var winner = "NoOne";
        if (cell.isX() === false && cell.isO() === false) {
                cell.value = player.symbol;
                togglePlayers();
                winner = checkWinner();
                if(winner !== "NoOne"){
                    $scope.showWinner = true;
                    $scope.winnerPlayer = winner;
                    winner.score++;
                    $timeout(function () {
                        $scope.showWinner = false;
                        $scope.initNewBoard();
                    }, 3000);
                }
                if(isBoardFull() === true){
                    $scope.showTie = true;
                    $timeout(function () {
                        $scope.showTie = false;
                        $scope.initNewBoard();
                    }, 3000);
                }

        } else {
            $scope.showError = true;
            $timeout(function () {
                $scope.showError = false;
            }, 1000);
        }
    }
}