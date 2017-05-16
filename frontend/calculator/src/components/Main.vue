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
                    <button v-else-if="item == '.'" @click="calculator.addDecimal()" class="btn btn--default">
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
                backspace: 8,
                del: 46,
                point: 110
            }
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
    },
    created() {
        window.addEventListener("keyup", event => {
            if (event.keyCode >= this.keyCodes.numpadZero &&
                event.keyCode <= this.keyCodes.numpadNine) {
                    this.calculator.addNumber(event.keyCode - this.keyCodes.numpadZero);
                }
            else if (event.keyCode >= this.keyCodes.zero &&
                event.keyCode <= this.keyCodes.nine) {
                    this.calculator.addNumber(event.keyCode - this.keyCodes.zero);
                }
            else {
                switch (event.keyCode) {
                    case this.keyCodes.add:
                        this.calculator.addOperation("+", this.result);
                        break;
                    case this.keyCodes.sub:
                        this.calculator.addOperation("-", this.result);
                        break;
                    case this.keyCodes.mul:
                        this.calculator.addOperation("*", this.result);
                        break;
                    case this.keyCodes.div:
                        this.calculator.addOperation("/", this.result);
                        break;
                    case this.keyCodes.backspace:
                        this.calculator.delete();
                        break;
                    case this.keyCodes.del:
                        this.clear();
                        break;
                    case this.keyCodes.point:
                        this.calculator.addDecimal();
                        break;
                    case this.keyCodes.enter:
                        this.calculate();
                        break;
                }
            }
        });
    }
};
</script>
