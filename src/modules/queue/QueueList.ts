import Node from "../node/Node";
import List from "../list/List";

/**
 * Класс, представляющий очередь, реализованную с помощью однонаправленного списка
 */
class QueueList<T> {
  private _size: number;        // количество элементов в очереди
  private _list: List<T>;       // вспомогательный список


  /**
   * Конструктор, создающий пустую очередь
   */
  public constructor() {
    this._size = 0;
    this._list = new List();
  }


  /**
   * Геттер для поля _size (количество элементов в очереди)
   */
  public get size(): number {
    return this._size;
  }


  /**
   * Добавляет элемент в очередь (список)
   * @param elements        добавляемый элемент (элементы)
   */
  public add(...elements: Array<T>): void {
    this._size += elements.length;
    this._list.add(...elements);
  }

  
  /**
   * Возвращает элемент, находящийся в начале очереди
   */
  public peek(): Node<T> | undefined | null {
    return this._list.get(0);
  }


  /**
   * Удаляет элемент, который находится в начале очереди
   */
  public poll(): void {
    --this._size;
    this._list.remove(0);
  }


  /**
   * Удаляет все элементы из очереди
   */
  public clear(): void {
    const N: number = this._size;

    for (let i: number = 0; i < N; ++i) {
      this.poll();
    }
  }


  /**
   * Возвращает true, если очередь пуста
   */
  public isEmpty(): boolean {
    return (this._size === 0);
  }


  /**
   * Возвращает строковое представление очереди
   */
  public toString(): string {
    return this._list.toString();
  }
}


/* Экспорт класса для его использования в других файлах */
export default QueueList;
