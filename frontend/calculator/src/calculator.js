export default class Calculator {
    constructor() {
        this.calcString = [];
    }

    add(val, start = 0) {
        if (this.isOperation(val)) {
            this.addOperation(val, start);
        }
        else if (val == ".") {
            this.addPoint();
        }
        else {
            this.addNumber(val);
        }
    }

    addNumber(val) {
        val = val.toString();

        if (this.calcString.length == 0 || this.isOperation(this.last())) {
            this.calcString.push(val);
        }
        else if (this.last() == ".") {
            this.calcString.pop();
            this.calcString.push(this.calcString.pop() + "." + val);
        }
        else {
            this.calcString.push(this.calcString.pop() + val);
        }
    }

    addOperation(val, start = 0) {
        if (this.calcString.length == 0) {
            this.calcString.push(start.toString());
        }

        if (this.isOperation(this.last()) || this.last() == ".") {
            this.calcString.pop();
        }

        this.calcString.push(val);
    }

    addPoint() {
        if (this.calcString.length == 0 || this.isOperation(this.last())) {
            this.calcString.push("0");
        }

        if (this.last() != "." && !this.isDecimal(this.last())) {
            this.calcString.push(".");
        }
    }

    delete() {
        if (this.calcString.length > 0) {
            if (this.isDecimal(this.last()) || this.last().length > 1) {
                this.calcString.push(this.calcString.pop().slice(0, -1));
            }
            else {
                this.calcString.pop();
            }
        }
    }

    isOperation(val) {
        return val == "+" || val == "-" || val == "*" || val == "/";
    }

    isDecimal(val) {
        return ~val.indexOf(".");
    }

    calculate() {
        var success = false,
            result = undefined;

        if (this.calcString.length > 0 && !this.isOperation(this.last()) && this.last() != ".") {
            this.doMultiplicative();
            result = this.doAdditive();
            success = true;

            this.clear();
        }

        return { success, result };
    }

    doMultiplicative() {
        for (let i = 0; i < this.calcString.length; i++) {
            switch (this.calcString[i]) {
                case "*":
                    this.calcString.splice(
                        i - 1,
                        3,
                        +this.calcString[i - 1] * +this.calcString[i + 1]);
                    i--;
                    break;
                case "/":
                    this.calcString.splice(
                        i - 1,
                        3,
                        +this.calcString[i - 1] / +this.calcString[i + 1]);
                    i--;
                    break;
            }
        }
    }

    doAdditive() {
        let result = +this.calcString[0];

        for (let i = 1; i < this.calcString.length; i++) {
            switch (this.calcString[i]) {
                case "+":
                    result += +this.calcString[i + 1];
                    i++;
                    break;
                case "-":
                    result -= +this.calcString[i + 1];
                    i++;
                    break;
            }
        }

        return result;
    }

    last() {
        return this.calcString[this.calcString.length - 1];
    }

    clear() {
        this.calcString = [];
    }

    toString() {
        return this.calcString.join("");
    }
}
