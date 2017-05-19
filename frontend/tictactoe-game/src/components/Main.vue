<template>
    <main class="container">
        <div class="board">
            <template v-for="(row, rowIndex) in board">
                <div v-for="(square, index) in row"
                    @click="fillSquare(rowIndex, index)">
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
            counter: 0
        };
    },
    methods: {
        fillSquare(row, index) {
            this.$set(this.board[row], index, "X");

            this.counter++;

            if (this.won()) {
                console.log("Won!");
            }

            if (this.counter < 9) {
                let square;

                do {
                    square = this.randomSquare();
                } while (this.board[square.x][square.y]);

                this.$set(this.board[square.x], square.y, "O");
                this.counter++;

                if (this.won()) {
                    console.log("Won!");
                }
            }
        },
        randomSquare() {
            var square = {};

            Object.assign(square, {
                x: Math.floor(Math.random() * this.board.length),
                y: Math.floor(Math.random() * this.board.length)
            });

            return square;
        },
        won() {
            for (let i = 0; i < this.board.length; i++) {
                let horizontal = [],
                    vertical = [],
                    diagonal = [];
                for (let j = 0; j < this.board.length; j++) {
                    horizontal.push(this.board[i][j]);
                    vertical.push(this.board[j][i]);
                    diagonal.push(this.board[j][j]);
                }

                if (this.check(horizontal) || this.check(vertical) || this.check(diagonal)) {
                    return true;
                }
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
