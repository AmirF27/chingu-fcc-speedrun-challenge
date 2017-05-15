export default class Calculator {
    constructor() {
        this.calcString = [];
    }

    add(val, start = 0) {
        if (!isNaN(val) && isNaN(this.calcString[this.calcString.length - 1])) {
            this.calcString.push(val);
        }

        if (isNaN(val)) {
            if (this.calcString.length == 0) {
                this.calcString.push(start);
            }

            if (!isNaN(this.calcString[this.calcString.length - 1])) {
                this.calcString.push(val);
            }
        }
    }

    calculate() {
        if (!isNaN(this.calcString[this.calcString.length - 1])) {
            this.doMultiplicative();
            let result = this.doAdditive();

            this.calcString = [];

            return result;
        }
    }

    doMultiplicative() {
        for (let i = 0; i < this.calcString.length; i++) {
            switch (this.calcString[i]) {
                case "*":
                    this.calcString.splice(
                        i - 1,
                        3,
                        this.calcString[i - 1] * this.calcString[i + 1]);
                    i--;
                    break;
                case "/":
                    this.calcString.splice(
                        i - 1,
                        3,
                        this.calcString[i - 1] / this.calcString[i + 1]);
                    i--;
                    break;
            }
        }
    }

    doAdditive() {
        let result = this.calcString[0];

        for (let i = 0; i < this.calcString.length; i++) {
            switch (this.calcString[i]) {
                case "+":
                    result += this.calcString[i + 1];
                    i++;
                    break;
                case "-":
                    result -= this.calcString[i + 1];
                    i++;
                    break;
            }
        }

        return result;
    }

    toString() {
        return this.calcString.join("");
    }
}
