<template>
    <main class="container">
        <div class="center-text message">
            <template v-if="gameOver">
                <template v-if="gameWon">
                    <p v-if="turn == 'computer'">You win!</p>
                    <p v-else>You lose...</p>
                </template>
                <p v-else>Draw</p>
            </template>
            <p v-else-if="turn == 'player'">Your turn</p>
            <p v-else-if="turn == 'computer'">Computer's turn</p>
        </div>
        <div class="board center-text">
            <div v-if="!gameStarted" class="choice">
                <p>Would you like to play as X or O?</p>
                <button @click="startGame('X')" class="btn btn--default">X</button>
                <button @click="startGame('O')" class="btn btn--default">O</button>
            </div>
            <template v-else v-for="(row, rowIndex) in board">
                <div v-for="(square, index) in row"
                    @click="makeMove(rowIndex, index)" class="square">
                    {{ square }}
                </div>
            </template>
        </div>
    </main>
</template>

<script>
"use strict";

export default {
    data() {
        return {
            board: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ],
            gameOver: false,
            gameStarted: false,
            gameWon: false,
            moves: 0,
            turn: "",
            playerMark: "",
            computerMark: ""
        };
    },
    methods: {
        startGame(playerMark) {
            this.playerMark = playerMark;
            this.computerMark = playerMark == "X" ? "O" : "X";
            this.gameStarted = true;
            this.resetGame();
        },
        resetGame() {
            this.turn = "player";
            this.gameOver = false;
            this.moves = 0;
            this.gameWon = false;
        },
        resetBoard() {
            for (let row of this.board) {
                for (let i = 0; i < row.length; i++) {
                    row[i] = "";
                }
            }
        },
        makeMove(row, index) {
            if (!this.gameOver &&
                    this.turn == "player" &&
                    !this.board[row][index]) {
                this.setSquare(row, index, this.playerMark);
                this.turn = "computer";
                setTimeout(this.computerMove, 500);
            }
        },
        computerMove() {
            if (!this.gameOver &&
                    this.turn == "computer" &&
                    this.moves < this.board.length ** 2) {
                let square;

                do {
                    square = this.randomSquare();
                } while (this.board[square.x][square.y]);

                this.setSquare(square.x, square.y, this.computerMark);
                this.turn = "player";
            }
        },
        setSquare(row, index, mark) {
            this.$set(this.board[row], index, mark);
            this.moves++;

            this.gameWon = this.won();

            if (this.gameWon || this.moves == this.board.length ** 2) {
                this.gameOver = true;
                setTimeout(() => {
                    this.resetGame();
                    this.resetBoard();
                }, 1000);
            }
        },
        randomSquare() {
            return {
                x: Math.floor(Math.random() * this.board.length),
                y: Math.floor(Math.random() * this.board.length)
            };
        },
        won() {
            var diagonal1 = [],
                diagonal2 = [];

            for (let i = 0; i < this.board.length; i++) {
                let horizontal = [],
                    vertical = [];
                for (let j = 0; j < this.board.length; j++) {
                    horizontal.push(this.board[i][j]);
                    vertical.push(this.board[j][i]);
                }

                diagonal1.push(this.board[i][i]);
                diagonal2.push(this.board[i][this.board.length - 1 - i]);

                if (this.check(horizontal) || this.check(vertical)) {
                    return true;
                }
            }

            if (this.check(diagonal1) || this.check(diagonal2)) {
                return true;
            }

            return false;
        },
        check(arr) {
            for (let i = 1; i < arr.length; i++) {
                if (!arr[0] || !arr[i]) {
                    return false;
                }
                else if (arr[0] != arr[i]) {
                    return false;
                }
            }

            return true;
        }
    }
};
</script>
