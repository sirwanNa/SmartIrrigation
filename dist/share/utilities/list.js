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
}
exports.List = List;
