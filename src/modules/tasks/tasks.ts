/**
 * Преобразовывает строку выражения в массив, удаляя при этом пробелы
 * @param expr        строка арифметического выраженияв префиксной форме
 */
const exprToArray: (_: string) => Array<string> = (expr: string) => {
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
export const calcInPrefixForm: (_: string) => number = (expr: string) => {
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
export const toPrefixForm: (_: string) => string = (expr: string) => {
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


/**
 * Складывает 2 числа, которые не могут быть представлены в виде примитивных типов
 * @param leftNumber        // первое из складываемых чисел
 * @param rightNumber       // второе из складываемых чисел
 */
export const addTwoLargeNumbers: (_: string, __: string) => string = (leftNumber: string, rightNumber: string) => {
  if (leftNumber.length < rightNumber.length) {   // к большему по длине числу должно прибавляться меньшее
    [leftNumber, rightNumber] = [rightNumber, leftNumber];
  }

  let leftStack: Array<number> = leftNumber.split("").map(digit => +digit).reverse();
  let rightStack: Array<number> = rightNumber.split("").map(digit => +digit).reverse();

  let carry: number = 0;

  // начинаем складывать с конца
  return leftStack.map((digit: number, index: number) => {
    const oDigit: number = (index >= rightStack.length) ? 0 : rightStack[index]; // к числу по сути добавляются дополнительные нули
    const tempRes: number = digit + oDigit + carry;

    if (tempRes >= 10) {
      carry = 1;
      // return tempRes - 10;
      return ((index === leftStack.length - 1) ? tempRes : tempRes - 10);
    }

    carry = 0;
    return tempRes;
  })
    .reverse()
    .join("");
}
