/**
 * Основная функция
 */
const main: () => Promise<void> = async () => {
  ;
}


/* Запуск функции с отловом ошибок */
main()
  .catch((err: Error) => {
    console.log(err.message);
  });
