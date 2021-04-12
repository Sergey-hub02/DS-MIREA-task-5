import * as fs from "fs";
import * as consts from "./constants";
import QueueList from "./modules/queue/QueueList";

const STDIN: string = fs.readFileSync(consts.PATH_TO_INPUT + consts.INPUT_FILE, "utf-8");

/**
 * Основная функция
 */
const main: () => Promise<void> = async () => {
  let queue: QueueList<number> = new QueueList();

  STDIN.split(" ").forEach(item => {
    queue.add(+item);
  });

  console.log(queue);
  console.log(queue.toString());

  queue.poll();
  queue.poll();

  console.log(queue);
  console.log(queue.toString());
}


/* Запуск функции с отловом ошибок */
main()
  .catch((err: Error) => {
    console.log(err.message);
  });
