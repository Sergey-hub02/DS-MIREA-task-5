/**
 * Представляет структуру данных очередь, которая реализована с помощью массива
 */
class QueueArray<T> {
  private size: number;         // количество элементов в очереди
  private array: Array<T>;      // вспомогательный массив

  /**
   * Конструктор по умолчанию, который создаёт пустую очередь
   */
  constructor() {
    this.size = 0;
    this.array = [];
  }


  /**
   * Добавляет элемент в конец очереди
   * @param element       добавляемый элемент
   */
  add(element: T): void {
    ++this.size;
    this.array.push(element);
  }


  /**
   * Возвращает элемент, который находится в начале очереди
   */
  peek(): T | undefined {
    return (this.size === 0) ? undefined : this.array[0];
  }


  /**
   * Удаляет элемент, который находится в начале очереди
   */
  poll(): void {
    if (this.size === 0) {
      throw new Error("[ERROR]: Нельзя удалить элемент, т.к. очередь пуста!");
    }

    --this.size;
    this.array.shift();
  }


  /**
   * Возвращает строковое представление очереди
   */
  toString(): string {
    return `[${this.array.join()}]`;
  }
}


/* Экспорт класса для его использования в других файлах */
export default QueueArray;
