/**
 * Представляет структуру данных очередь, которая реализована с помощью массива
 */
class QueueArray<T> {
  private _size: number;         // количество элементов в очереди
  private array: Array<T>;      // вспомогательный массив

  /**
   * Конструктор по умолчанию, который создаёт пустую очередь
   */
  public constructor() {
    this._size = 0;
    this.array = [];
  }


  /**
   * Геттер, который возвращает количество элементов в очереди
   */
  public get size(): number {
    return this._size;
  }


  /**
   * Добавляет элементы в конец очереди
   * @param elements       добавляемый элемент
   */
  public add(...elements: Array<T>): void {
    this._size += elements.length;
    
    for (const element of elements) {
      this.array.push(element);
    }
  }


  /**
   * Возвращает элемент, который находится в начале очереди
   */
  public peek(): T | undefined {
    return (this._size === 0) ? undefined : this.array[0];
  }


  /**
   * Удаляет элемент, который находится в начале очереди
   */
  public poll(): void {
    if (this._size === 0) {
      throw new Error("[ERROR]: Нельзя удалить элемент, т.к. очередь пуста!");
    }

    --this._size;
    this.array.shift();
  }


  /**
   * Опустошает очередь (удаляет все элементы из очереди)
   */
  public clear(): void {
    this._size = 0;
    this.array = [];
  }


  /**
   * Определяет, является ли очередь пустой
   */
  public isEmpty(): boolean {
    return (this._size === 0);
  }


  /**
   * Возвращает строковое представление очереди
   */
  public toString(): string {
    return `[${this.array.join()}]`;
  }
}


/* Экспорт класса для его использования в других файлах */
export default QueueArray;
