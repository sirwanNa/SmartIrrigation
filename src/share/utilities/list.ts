export class List<T> {
  private items: T[] = [];
  constructor(itemsList?: T[]){
    if(itemsList !== undefined){
      this.items = itemsList;
    }   
  }
  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this.items = this.items.filter(i => i !== item);
  }

  getAll(): T[] {
    return this.items;
  }
  filter(predicate: (item: T) => boolean): List<T> {
    const filteredItems = this.items.filter(predicate);
    return new List<T>(filteredItems);
  }
  hasValue(predicate?: (item: T) => boolean): boolean {
    if (predicate) {
      return this.items.some(predicate);
    }
    return this.items !== undefined && this.items.length > 0;
  }

  firstItem(): T | undefined {
    return this.items.length > 0 ? this.items[0] : undefined;
  }
  orderBy(selector: (item: T) => any): List<T> {
    const sorted = [...this.items].sort((a, b) => {
      const aVal = selector(a);
      const bVal = selector(b);
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    });
    return new List<T>(sorted);
  }

  orderByDesc(selector: (item: T) => any): List<T> {
    const sorted = [...this.items].sort((a, b) => {
      const aVal = selector(a);
      const bVal = selector(b);
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    });
    return new List<T>(sorted);
  }
}