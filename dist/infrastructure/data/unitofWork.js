"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWork = void 0;
class UnitOfWork {
    constructor(context) {
        this.context = context;
        context.connect();
    }
    async start() {
        await this.context.startTransaction();
    }
    async complete() {
        await this.context.commit();
    }
    async rollback() {
        await this.context.abort();
    }
    getSession() {
        return this.context.getSession();
    }
}
exports.UnitOfWork = UnitOfWork;
