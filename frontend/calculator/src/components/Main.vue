<template>
    <main class="container">
        <div>{{ result }}</div>
        <div>{{ calculator.toString() }}</div>
        <div>
            <button v-for="number in numbers" @click="calculator.add(number)" class="btn btn--default">
                {{ number }}
            </button>
        </div>
        <div class="">
            <button v-for="op in operations" @click="calculator.add(op, result)" class="btn btn--default">
                {{ op }}
            </button>
        </div>
        <button @click="calculate" class="btn btn--default">=</button>
    </main>
</template>

<script>
import Calculator from "../calculator";

export default {
    data() {
        return {
            calculator: new Calculator(),
            numbers: [],
            operations: ["+", "-", "*", "/"],
            result: 0
        };
    },
    methods: {
        calculate() {
            this.result = this.calculator.calculate() || this.result;
        }
    },
    created() {
        for (let num = 0; num <= 9; num++) {
            this.numbers.push(num);
        }
    }
};
</script>
