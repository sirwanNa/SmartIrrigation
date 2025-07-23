"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List {
    constructor(itemsList) {
        this.items = [];
        if (itemsList !== undefined) {
            this.items = itemsList;
        }
    }
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        this.items = this.items.filter(i => i !== item);
    }
    getAll() {
        return this.items;
    }
    filter(predicate) {
        const filteredItems = this.items.filter(predicate);
        return new List(filteredItems);
    }
    hasValue(predicate) {
        if (predicate) {
            return this.items.some(predicate);
        }
        return this.items !== undefined && this.items.length > 0;
    }
    firstItem() {
        return this.items.length > 0 ? this.items[0] : undefined;
    }
    orderBy(selector) {
        const sorted = [...this.items].sort((a, b) => {
            const aVal = selector(a);
            const bVal = selector(b);
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
        return new List(sorted);
    }
    orderByDesc(selector) {
        const sorted = [...this.items].sort((a, b) => {
            const aVal = selector(a);
            const bVal = selector(b);
            return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        });
        return new List(sorted);
    }
}
exports.List = List;
