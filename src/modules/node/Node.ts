/**
 * Класс, представляющий элемент однонаправленного списка
 */
class Node<T> {
  private _value: T | undefined;           // информационная часть узла
  private _next: Node<T> | undefined | null;      // ссылка на следующий элемент списка

  /**
   * Конструктор, который создаёт узел
   * @param value         значение информационной части узла
   * @param next          ссылка на следующий элемент списка
   */
  constructor(value?: T | undefined, next?: Node<T> | undefined | null) {
    this._value = value;
    this._next = next;
  }


  /**
   * Геттер для поля _value (значение информационной части)
   */
  get value(): T | undefined {
    return this._value;
  }

  
  /**
   * Сеттер для поля _value (значение информационной части)
   * @param value         новое значение информационной части
   */
  set value(value: T | undefined) {
    this._value = value;
  }


  /**
   * Геттер для поля _next (ссылка на следующий элемент списка)
   */
  get next(): Node<T> | undefined | null {
    return this._next;
  }


  /**
   * Сеттер для поля _next (ссылка на следующий элемент списка)
   * @param next        новая ссылка на следующий элемент списка
   */
  set next(next: Node<T> | undefined | null) {
    this._next = next;
  }
}


/* Экспорт класса для его использования в других файлах */
export default Node;
