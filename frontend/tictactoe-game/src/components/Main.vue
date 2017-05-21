<template>
    <main class="container">
        <div class="board">
            <template v-for="(row, rowIndex) in board">
                <div v-for="(square, index) in row"
                    @click="makeMove(rowIndex, index)">
                    {{ square }}
                </div>
            </template>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            board: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ],
            gameOver: false,
            moves: 0,
            turn: "player"
        };
    },
    methods: {
        makeMove(row, index) {
            if (!this.gameOver && this.turn == "player" && !this.board[row][index]) {
                this.setSquare(row, index, "X");
                this.turn = "computer";
                setTimeout(this.computerTurn, 500);
            }
        },
        computerTurn() {
            if (!this.gameOver && this.moves < this.board.length ** 2) {
                let square;

                do {
                    square = this.randomSquare();
                } while (this.board[square.x][square.y]);

                this.setSquare(square.x, square.y, "O");
                this.turn = "player";
            }
        },
        setSquare(row, index, mark) {
            this.$set(this.board[row], index, mark);
            this.moves++;

            if (this.won()) {
                this.gameOver = true;
                console.log("Won!");
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
