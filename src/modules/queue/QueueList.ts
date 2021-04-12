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
    this._list.add(...elements);
  }
}


/* Экспорт класса для его использования в других файлах */
export default QueueList;
