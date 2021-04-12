export const calcInPrefixForm: (expr: string) => void = (expr: string) => {
  let exp: Array<string> = [];
  expr.split(" ").forEach((item: string) => {
    if (item === " ") {
      return;
    }

    if (
      (item.length !== 1) &&
      (item.includes("+") || item.includes("-") || item.includes("/") || item.includes("*"))
    ) {
      item.split("").forEach((item: string) => {
        exp.push(item);
      });

      return;
    }

    exp.push(item);
  });

  console.log(exp);
}


export const toPrefixForm: (expr: string) => string = (expr: string) => {
  if (expr.includes("(") || expr.includes(")")) {
    throw new Error("[ERROR]: Выражение не должно содержать скобок!");
  }

  return "";
}
