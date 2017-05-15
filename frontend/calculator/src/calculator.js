export default class Calculator {
    constructor() {
        this.calcString = [];
    }

    add(val, start = 0) {
        if (this.isOperation(val)) {
            if (this.calcString.length == 0) {
                this.calcString.push(start);
            }

            if (!this.isOperation(this.calcString[this.calcString.length - 1])) {
                this.calcString.push(val);
            }
            else {
                this.calcString.pop();
                this.calcString.push(val);
            }
        }
        else {
            if (this.calcString.length == 0 || this.isOperation(this.calcString[this.calcString.length - 1])) {
                this.calcString.push(val);
            }
            else {
                this.calcString.push(this.calcString.pop() * 10 + val);
            }
        }
    }

    delete() {
        if (this.isOperation(this.calcString[this.calcString.length - 1])) {
            this.calcString.pop();
        }
        else {
            if (parseInt(this.calcString[this.calcString.length - 1] / 10) > 0) {
                this.calcString.push(parseInt(this.calcString.pop() / 10));
            }
            else {
                this.calcString.pop();
            }
        }
    }

    isOperation(val) {
        return val == "+" || val == "-" || val == "*" || val == "/";
    }

    calculate() {
        if (!isNaN(this.calcString[this.calcString.length - 1])) {
            this.doMultiplicative();
            let result = this.doAdditive();

            this.clear();

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

    clear() {
        this.calcString = [];
    }

    toString() {
        return this.calcString.join("");
    }
}
