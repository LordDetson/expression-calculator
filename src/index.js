let Calc = require('./exprcalc');

function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    if (!check(expr, [['(', ')']])) {
        throw "ExpressionError: Brackets must be paired";
    }
    return (new Calc()).compile(expr).calc();
}

function check(str, bracketsConfig) {
    let arr = [];
    let buff = null;
    let isCorrect = false;
    let isBracket = false;
    for (let i = 0; i < str.length; i++) {
        if (arr.length === 0) {
            for (let j = 0; j < bracketsConfig.length; j++) {
                if (str[i] === bracketsConfig[j][0] || str[i] === bracketsConfig[j][1]) {
                    arr.push(str[i]);
                    break;
                }
            }
        } else {
            buff = arr.pop();
            isCorrect = false;
            isBracket = false;
            for (let j = 0; j < bracketsConfig.length; j++) {
                if (buff === bracketsConfig[j][0] && str[i] === bracketsConfig[j][1]) {
                    isCorrect = true;
                    break;
                }
                if (str[i] === bracketsConfig[j][0] || str[i] === bracketsConfig[j][1]) {
                    isBracket = true;
                }
            }
            if (!isCorrect) {
                arr.push(buff);
                if (isBracket) {
                    arr.push(str[i]);
                }
            }
        }
    }
    return arr.length === 0;
}

module.exports = {
    expressionCalculator
}