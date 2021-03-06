import * as fs from "fs";
import * as consts from "./constants";
import * as tasks from "./modules/tasks/tasks";

const STDIN: string = fs.readFileSync(consts.PATH_TO_INPUT + consts.INPUT_FILE, "utf-8");

/**
 * Основная функция
 */
const main: () => Promise<void> = async () => {
  const [lNumber, rNumber] = STDIN.split(" ");
  console.log(`${lNumber} + ${rNumber} = ${tasks.addTwoLargeNumbers(lNumber, rNumber)}`);
}


/* Запуск функции с отловом ошибок */
main()
  .catch((err: Error) => {
    console.log(err.message);
  });
