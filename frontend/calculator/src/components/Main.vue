<template>
    <main class="container">
        <div class="calculator">
            <div class="screen">
                <div class="calc-string">{{ calculator.toString() }}</div>
                <div class="result">{{ result }}</div>
            </div>
            <template v-for="row in layout">
                <template v-for="item in row">
                    <button v-if="!isNaN(item)" @click="calculator.add(item)" class="btn btn--default">
                        {{ item }}
                    </button>
                    <button v-else-if="calculator.isOperation(item)" @click="calculator.add(item, result)" class="btn btn--default" :class="{ add: item == '+' }">
                        {{ item }}
                    </button>
                    <button v-else-if="item == '='" @click="calculate" class="btn btn--primary">
                        {{ item }}
                    </button>
                    <button v-else-if="item == 'AC'" @click="clear" class="btn btn--negative ac">
                        {{ item }}
                    </button>
                    <button v-else-if="item == 'CE'" @click="calculator.delete()" class="btn btn--negative">
                        {{ item }}
                    </button>
                    <button v-else class="btn btn--default">
                        {{ item }}
                    </button>
                </template>
            </template>
        </div>
    </main>
</template>

<script>
import Calculator from "../calculator";

export default {
    data() {
        return {
            calculator: new Calculator(),
            layout: [
                ["AC", "CE", "/"],
                [7, 8, 9, "*"],
                [4, 5, 6, "-"],
                [1, 2, 3, ""],
                [0, ".", "=", "+"]
            ],
            result: 0
        };
    },
    methods: {
        calculate() {
            this.result = this.calculator.calculate() || this.result;
        },
        clear() {
            this.calculator.clear();
            this.result = 0;
        }
    }
};
</script>
