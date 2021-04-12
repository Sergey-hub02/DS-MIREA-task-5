import * as fs from "fs";
import * as consts from "./constants";
import List from "./modules/list/List";
import QueueList from "./modules/queue/QueueList";

const STDIN: string = fs.readFileSync(consts.PATH_TO_INPUT + consts.INPUT_FILE, "utf-8");

/**
 * Основная функция
 */
const main: () => Promise<void> = async () => {
  let list: List<number> = new List();
  let queue: QueueList<number> = new QueueList();

  STDIN.split("\n")[0].split(" ").forEach(item => {
    list.add(+item);
    queue.add(+item);
  });

  console.log(queue);
  console.log(queue.toString());

  console.log(queue.peek());
  queue.poll();

  console.log(queue.peek());
  queue.poll();
}


/* Запуск функции с отловом ошибок */
main()
  .catch((err: Error) => {
    console.log(err.message);
  });
