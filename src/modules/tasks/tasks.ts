/**
 * Преобразовывает строку выражения в массив, удаляя при этом пробелы
 * @param expr        строка арифметического выраженияв префиксной форме
 */
const exprToArray: (expr: string) => Array<string> = (expr: string) => {
  let exprArray: Array<string> = [];

  expr.split(" ").forEach((item: string) => {
    if (item === " ") {
      return;
    }

    if (
      (item.length !== 1) &&
      (item.includes("+") || item.includes("-") || item.includes("/") || item.includes("*"))
    ) {
      item.split("").forEach((item: string) => {
        exprArray.push(item);
      });

      return;
    }

    exprArray.push(item);
  });

  return exprArray;
}


/**
 * Вычисляет значение выражения, представленного в виде префиксной нотации
 * @param expr        выражение в префиксной нотации
 */
export const calcInPrefixForm: (expr: string) => number = (expr: string) => {
  let exp: Array<string> = exprToArray(expr);

  while (exp.length > 1) {
    const char: string = exp[0];
    const nextChar: string = exp[1];

    const left: boolean = (char === "+" || char === "-" || char === "/" || char === "*");
    const right: boolean = (nextChar === "+" || nextChar === "-" || nextChar === "/" || nextChar === "*");


    if (left && right || !left) { // оба символа - операции или текущий символ - операнд
      exp.push(char);
      exp = exp.slice(1);
      continue;
    }

    if (left && !right) { // следующий символ - операнд
      const num1: number = +nextChar;
      const num2: number = +exp[2];

      let res: number;

      switch (char) {
        case "+":
          res = num1 + num2;
          break;
        
        case "-":
          res = num1 - num2;
          break;
        
        case "/":
          res = num1 / num2;
          break;
        
        case "*":
          res = num1 * num2;
          break;
        
        default:
          throw new Error("[ERROR]: Неопознанная операция!");
      }

      exp.push(res.toString());
      exp = exp.slice(3);
      continue;
    }
  }

  return +exp[0];
}


/**
 * Преобразовывает выражение в инфиксной форме в префиксную
 * @param expr        выражение в инфиксной форме
 */
export const toPrefixForm: (expr: string) => string = (expr: string) => {
  if (expr.includes("(") || expr.includes(")")) {
    throw new Error("[ERROR]: Выражение не должно содержать скобок!");
  }

  // распределяет приоритет арифметических операций
  const PRIORITIES: Map<string, number> = new Map([
    ["+", 1],
    ["-", 1],
    ["*", 2],
    ["/", 2],
  ]);


  let stackOperands: Array<string> = [];        // стек операндов
  let stackOperations: Array<string> = [];      // стек операций

  expr.split("").forEach((char: string) => {
    if (char.toLowerCase() >= "a" && char.toLowerCase() <= "z") { // символ - это операнд
      stackOperands.unshift(char);
      return;
    }

    if (
      (stackOperations.length === 0) ||
      (PRIORITIES.get(char)! > PRIORITIES.get(stackOperations[0])!)
    ) { // если стек операций пуст или приоритет текущей операции выше, чем приоритет последней операции в стеке
      stackOperations.unshift(char);
      return;
    }

    // символ - операция, приоритет которой ниже, чем приоритет последней операции в стеке
    while (PRIORITIES.get(char)! <= PRIORITIES.get(stackOperations[0])!) {
      const operation: string = stackOperations.shift()!;
      const firstOperand: string = stackOperands.shift()!;
      const secondOperand: string = stackOperands.shift()!;
      stackOperands.unshift(`${operation}${secondOperand}${firstOperand}`);
    }

    stackOperations.unshift(char);
  });

  while (stackOperations.length > 0) {
    const operation: string = stackOperations.shift()!;
    const firstOperand: string = stackOperands.shift()!;
    const secondOperand: string = stackOperands.shift()!;
    stackOperands.unshift(`${operation}${secondOperand}${firstOperand}`);
  }

  return stackOperands[0];
}
