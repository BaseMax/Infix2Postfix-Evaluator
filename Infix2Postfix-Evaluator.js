/*
 * @Name: Infix2Postfix Evaluator JS
 * @Author: Max Base
 * @Date: 2022-11-05
 * @Repository: https://githun.com/basemax/Infix2Postfix-Evaluator
 */

// Const Variables
const operators = {
    "^": 4,
    "*": 3,
    "/": 3,
    "%": 3,
    "+": 2,
    "-": 2,
    "(": 1,
    ")": 1
};

// Functions
const is_operator = (c) => c in operators;
const is_digit = (c) => c >= '0' && c <= '9';
const is_identifier = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
const is_space = (c) => c === ' ';
const is_left_parenthesis = (c) => c === '(';
const is_right_parenthesis = (c) => c === ')';
const is_left_associative = (c) => c === '+' || c === '-' || c === '*' || c === '/' || c === '%';
const is_right_associative = (c) => c === '^';
const is_associative = (c) => is_left_associative(c) || is_right_associative(c);
const is_higher_precedence = (c1, c2) => {
    if (is_left_associative(c1) && operators[c1] === operators[c2]) return true;
    return operators[c1] > operators[c2];
};

const convert_infix_to_postfix = (infix) => {
    // Variables
    let stack = [];
    let postfix = [];

    // Main Body
    for (let i = 0; i < infix.length; i++) {
        let c = infix[i];
        if (is_digit(c)) {
            let number = c;
            while (i + 1 < infix.length && is_digit(infix[i + 1])) {
                number += infix[i + 1];
                i++;
            }
            postfix.push(number);
        } else if (is_identifier(c)) {
            let identifier = c;
            while (i + 1 < infix.length && is_identifier(infix[i + 1])) {
                identifier += infix[i + 1];
                i++;
            }
            postfix.push(identifier);
        } else if (is_space(c)) {
            continue;
        } else if (is_operator(c)) {
            if (is_left_parenthesis(c)) {
                stack.push(c);
            } else if (is_right_parenthesis(c)) {
                while (stack.length > 0 && !is_left_parenthesis(stack[stack.length - 1])) {
                    postfix.push(stack.pop());
                }
                stack.pop();
            } else {
                while (stack.length > 0 && is_associative(c) && is_higher_precedence(stack[stack.length - 1], c)) {
                    postfix.push(stack.pop());
                }
                stack.push(c);
            }
        }
    }

    while (stack.length > 0) postfix.push(stack.pop());

    return postfix;
};

const evaluate_postfix = (postfix, variables = {}) => {
    // Variables
    let stack = [];

    // Main Body
    for (let i = 0; i < postfix.length; i++) {
        let c = postfix[i];

        if (is_digit(c)) {
            stack.push(parseInt(c));
        } else if (is_identifier(c)) {
            if (c in variables) stack.push(variables[c]);
            else throw new Error("Variable " + c + " is not defined");
        } else if (is_operator(c)) {
            let a = stack.pop();
            let b = stack.pop();

            if (c === '+') stack.push(b + a);
            else if (c === '-') stack.push(b - a);
            else if (c === '*') stack.push(b * a);
            else if (c === '/') stack.push(b / a);
            else if (c === '%') stack.push(b % a);
            else if (c === '^') stack.push(b ** a);
        }
    }

    return stack.pop();
};

// Example
console.log(evaluate_postfix(convert_infix_to_postfix("2+3*4"), {}));
// 14
console.log(evaluate_postfix([ '2', '3', '4', '*', '+' ], {}));
// 14
console.log(evaluate_postfix([
    "a", "b", "/", "c", "-", "d", "e", "*", "+", "a", "c", "*", "-"
], { a: 4, b: 2, c: 3, d: 2, e: 5}));
// -3
