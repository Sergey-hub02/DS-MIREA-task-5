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
  public constructor(value?: T | undefined, next?: Node<T> | undefined | null) {
    this._value = value;
    this._next = next;
  }


  /**
   * Геттер для поля _value (значение информационной части)
   */
  public get value(): T | undefined {
    return this._value;
  }

  
  /**
   * Сеттер для поля _value (значение информационной части)
   * @param value         новое значение информационной части
   */
  public set value(value: T | undefined) {
    this._value = value;
  }


  /**
   * Геттер для поля _next (ссылка на следующий элемент списка)
   */
  public get next(): Node<T> | undefined | null {
    return this._next;
  }


  /**
   * Сеттер для поля _next (ссылка на следующий элемент списка)
   * @param next        новая ссылка на следующий элемент списка
   */
  public set next(next: Node<T> | undefined | null) {
    this._next = next;
  }


  /**
   * Возвращает строковое представление узла списка
   */
  public toString(): string {
    return `${this._value}`;
  }
}


/* Экспорт класса для его использования в других файлах */
export default Node;
