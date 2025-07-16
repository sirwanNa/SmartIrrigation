import { MongoContext } from "./mongoContext";

export class UnitOfWork {
  constructor(public context: MongoContext) {
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
