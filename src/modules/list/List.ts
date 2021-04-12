import Node from "../node/Node"
import { cloneDeep } from "lodash";

/**
 * Класс, представляющий структуру данных однонаправленный список
 */
class List<T> {
  private _size: number;          // количество элементов в списке
  private _header: Node<T> | undefined | null;       // ссылка на головной элемент списка

  /**
   * Вспомогательный метод. Вычисляет "настоящий" индекс в списке для указанного индекса
   * @param index       индекс
   */
  private calculateRealIndex(index: number): number {
    if (index < 0 || index >= this._size) {
      return -1;
    }

    return this._size - index - 1;
  }

  /**
   * Конструктор, создающий пустой список
   */
  public constructor() {
    this._size = 0;
    this._header = null;
  }


  /**
   * Геттер для поля _size (количество элементов в списке)
   */
  public get size(): number {
    return this._size;
  }


  /**
   * Сеттер для поля _size (количество элементов в списке)
   * @param size        новое количество элементов в списке
   */
  public set size(size: number) {
    this._size = size;
  }

  
  /**
   * Геттер для поля _header (ссылка на головной элемент списка)
   */
  public get header(): Node<T> | undefined | null {
    return this._header;
  }


  /**
   * Сеттер для поля _header (ссылка на головной элемент списка)
   * @param header        новый головной элемент списка
   */
  public set header(header: Node<T> | undefined | null) {
    this._header = header;
  }


  /**
   * Добавляет элементы или элемент в начало списка
   * @param elements        добавляемые элементы
   */
  public add(...elements: Array<T | undefined>): void {
    this._size += elements.length;

    for (const element of elements) {
      let tempNode: Node<T> = new Node(element);

      if (this._header === null) {  // список пустой
        this._header = tempNode;
        this._header.next = null;
        continue;
      }

      // список не является пустым, поэтому нужно применить трюк Вирта
      [this._header!.value, tempNode.value] = [tempNode.value, this._header!.value];

      tempNode.next = this._header!.next;
      this._header!.next = tempNode;
    }
  }


  /**
   * Возвращает элемент списка на заданной позиции
   * @param index       индекс элемента
   */
  public get(index: number): Node<T> | undefined | null {
    let realIndex: number = this.calculateRealIndex(index);

    if (realIndex < 0 || this._size === 0) {
      return undefined;
    }

    let copyHeader: Node<T> | undefined | null = cloneDeep(this._header);
    while (copyHeader !== null && (realIndex--) > 0) {
      copyHeader = copyHeader!.next;
    }

    return copyHeader;
  }


  /**
   * Удаляет элемент под заданным индексом из списка
   * @param index       индекс удаляемого элемента
   */
  public remove(index: number): void {
    let realIndex: number = this.calculateRealIndex(index);

    if (this._size === 0 || realIndex < 0) {
      return;
    }

    if (realIndex === 0) {  // нужно удалить головной элемент
      --this._size;
      this._header = this._header!.next;
      return;
    }

    let listValues: Array<T | undefined> = [];
    let copyHeader: Node<T> | undefined | null = cloneDeep(this._header);

    while (copyHeader !== null && (realIndex--) - 1 > 0) {
      listValues.push(copyHeader!.value);
      copyHeader = copyHeader!.next;
    }

    // в copyHeader находится ссылка на элемент до удаляемого
    listValues.push(copyHeader!.value);     // добавляем в массив значение элемента до удаляемого
    copyHeader = copyHeader!.next!.next;

    while (copyHeader !== null) {
      listValues.push(copyHeader!.value);
      copyHeader = copyHeader!.next;
    }

    const newLength: number = listValues.length;

    let newList: List<T> = new List();

    listValues.forEach((_, index: number) => {
      newList.add(listValues[newLength - index - 1]);
    });

    this._size = newLength;
    this._header = newList.header;
  }


  /**
   * Возвращает строковое представление однонаправленного списка
   */
  public toString(): string {
    if (this._size === 0) {   // список пустой
      return "[]";
    }

    // клонирование головного объекта списка
    let list: Array<T | undefined> = [];

    let copyHeader: Node<T> | undefined | null = cloneDeep(this._header);
    list.push(copyHeader!.value);

    copyHeader = copyHeader!.next;

    while (copyHeader !== null) {
      list.push(copyHeader!.value);
      copyHeader = copyHeader!.next;
    }

    return `[${list.reverse().join(", ")}]`;
  }
}


/* Экспорт класса для его использования в других файлах */
export default List;
