import Node from "../node/Node"

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
   * Добавляет элементы или элемент в конец списка
   * @param elements        добавляемые элементы
   */
  public add(...elements: Array<T>): void {
    this._size += elements.length;

    let copyHeader: Node<T> | null | undefined = JSON.parse(JSON.stringify(this._header)) as Node<T>;

    while (copyHeader != null) {
      copyHeader = copyHeader.next;
    }

    // сейчас в copyHeader находится значение null, что в принципе является последним элементом
    for (const element of elements) {
      copyHeader = new Node(element);
      copyHeader.next = null;
      copyHeader = copyHeader.next;
    }
  }


  /**
   * Возвращает строковое представление однонаправленного списка
   */
  public toString(): string {
    if (this._size === 0) {
      return "[]";
    }

    let copyHeader: Node<T> | null | undefined = this._header;

    let strList: string = `[${(copyHeader as Node<T>).toString()}`;
    copyHeader = (copyHeader as Node<T>).next;

    while (copyHeader != null) {
      strList += `, ${copyHeader.toString()}`;
      copyHeader = (copyHeader as Node<T>).next;
    }

    strList += `]`;
    return strList;
  }
}


/* Экспорт класса для его использования в других файлах */
export default List;
