# Infix t Postfix Evaluator

A Javascript Implementation of an Infix to Postfix Evaluator. It can evaluate any infix expression and convert it to postfix expression.

### Infix

Infix notation is the most common way of writing arithmetic expressions. It is known as standard notation in some countries. The following example shows an infix expression and its equivalent postfix expression:

```text
2 + 3 * 4
2 3 4 * +
```

### Postfix

Postfix notation is a way of writing arithmetic expressions without using parentheses that specify the order of operations. It is known as Reverse Polish notation (RPN) in some countries. The following example shows a postfix expression and its equivalent infix expression:

```text
2 3 4 * +
2 + 3 * 4
```

## Examples

```javascript
console.log(evaluate_postfix(convert_infix_to_postfix("2+3*4"), {}));
// 14
console.log(evaluate_postfix([ '2', '3', '4', '*', '+' ], {}));
// 14
console.log(evaluate_postfix([
    "a", "b", "/", "c", "-", "d", "e", "*", "+", "a", "c", "*", "-"
], { a: 4, b: 2, c: 3, d: 2, e: 5}));
// -3
```

Copyright (c) 2022, Max Base
