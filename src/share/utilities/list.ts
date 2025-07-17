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
}