import * as fs from "fs";
import * as consts from "./constants";
import List from "./modules/list/List";

const STDIN: string = fs.readFileSync(consts.PATH_TO_INPUT + consts.INPUT_FILE, "utf-8");

/**
 * Основная функция
 */
const main: () => Promise<void> = async () => {
  let lst: List<number> = new List();

  const values: Array<number> = STDIN.split(" ").map(item => +item);

  values.forEach(item => {
    lst.add(item);
  });

  console.log(lst.size);
  console.log(lst);
  console.log(lst.toString());
}


/* Запуск функции с отловом ошибок */
main()
  .catch((err: Error) => {
    console.log(err.message);
  });
