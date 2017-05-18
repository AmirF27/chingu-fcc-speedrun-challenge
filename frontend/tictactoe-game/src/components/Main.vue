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

            if (this.counter < 9) {
                let square;

                do {
                    square = this.randomSquare();
                } while (this.board[square.x][square.y]);

                this.$set(this.board[square.x], square.y, "O");
                this.counter++;
            }

            console.log(this.counter);
        },
        randomSquare() {
            var square = {};

            Object.assign(square, {
                x: Math.floor(Math.random() * this.board.length),
                y: Math.floor(Math.random() * this.board.length)
            });

            return square;
        }
    }
};
</script>
