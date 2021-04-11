import Node from "../node/Node"
import { cloneDeep } from "lodash";

/**
 * Класс, представляющий структуру данных однонаправленный список
 */
class List<T> {
  private _size: number;          // количество элементов в списке
  private _header: Node<T> | null | undefined;       // ссылка на головной элемент списка

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
  public get header(): Node<T> | null | undefined {
    return this._header;
  }


  /**
   * Сеттер для поля _header (ссылка на головной элемент списка)
   * @param header        новый головной элемент списка
   */
  public set header(header: Node<T> | null | undefined) {
    this._header = header;
  }


  /**
   * Добавляет элементы или элемент в начало списка
   * @param elements        добавляемые элементы
   */
  public add(...elements: Array<T>): void {
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
   * Возвращает строковое представление однонаправленного списка
   */
  public toString(): string {
    if (this._size === 0) {   // список пустой
      return "[]";
    }

    // клонирование головного объекта списка
    let copyHeader: Node<T> | null | undefined = cloneDeep(this._header);

    let strList: string = `[${copyHeader!.value}`;
    copyHeader = copyHeader!.next;

    while (copyHeader !== null) {
      strList += `, ${copyHeader!.value}`;
      copyHeader = copyHeader!.next;
    }

    strList += `]`;
    return strList;
  }
}


/* Экспорт класса для его использования в других файлах */
export default List;
