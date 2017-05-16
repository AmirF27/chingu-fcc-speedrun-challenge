<template>
    <main class="container">
        <div class="calculator">
            <div class="screen">
                <div class="calc-string">{{ calculator.toString() }}</div>
                <div class="result">{{ result }}</div>
            </div>
            <template v-for="row in layout">
                <template v-for="item in row">
                    <button v-if="!isNaN(item)" @click="calculator.addNumber(item)" class="btn btn--default">
                        {{ item }}
                    </button>
                    <button v-else-if="calculator.isOperation(item)" @click="calculator.addOperation(item, result)" class="btn btn--default" :class="{ add: item == '+' }">
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
                    <button v-else-if="item == '.'" @click="calculator.addPoint()" class="btn btn--default">
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
            result: 0,
            keyCodes: {
                numpadZero: 96,
                numpadNine: 105,
                zero: 48,
                nine: 57,
                add: 107,
                sub: 109,
                mul: 106,
                div: 111,
                enter: 13,
                bs: 8,
                del: 46,
                point: 110
            }
        };
    },
    methods: {
        calculate() {
            var res = this.calculator.calculate();

            if (res.success) {
                this.result = res.result;
            }
        },
        clear() {
            this.calculator.clear();
            this.result = 0;
        },
        isNumber(key) {
            return (key >= this.keyCodes.numpadZero &&
                key <= this.keyCodes.numpadNine) ||
                (key >= this.keyCodes.zero &&
                key <= this.keyCodes.nine);
        },
        isOperation(key) {
            return key == this.keyCodes.add ||
                key == this.keyCodes.sub ||
                key == this.keyCodes.mul ||
                key == this.keyCodes.div;
        },
        toNumber(key) {
            return key >= this.keyCodes.numpadZero
                ? key - this.keyCodes.numpadZero
                : key - this.keyCodes.zero;
        }
    },
    created() {
        document.addEventListener("keyup", event => {
            if (this.isNumber(event.keyCode)) {
                this.calculator.addNumber(this.toNumber(event.keyCode));
            }
            else if (this.isOperation(event.keyCode)) {
                this.calculator.addOperation(
                    String.fromCharCode(event.keyCode - 64),
                    this.result);
            }
            else if (event.keyCode == this.keyCodes.point) {
                this.calculator.addPoint();
            }
            else if (event.keyCode == this.keyCodes.enter) {
                this.calculate();
            }
            else if (event.keyCode == this.keyCodes.bs) {
                this.calculator.delete();
            }
            else if (event.keyCode == this.keyCodes.del) {
                this.clear();
            }
        });
    }
};
</script>
