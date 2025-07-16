import { MongoClient, Db, ClientSession } from "mongodb";

export class MongoContext {
  private client: MongoClient;
  public db: Db;
  public session: ClientSession | null = null;

  constructor(uri: string, dbName: string) {
    this.client = new MongoClient(uri);
    this.db = this.client.db(dbName);
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db();
  }

  async startTransaction() {
    this.session = this.client.startSession();
    this.session.startTransaction();
  }

  async commit() {
    if (this.session) {
      await this.session.commitTransaction();
      this.session.endSession();
    }
  }

  async abort() {
    if (this.session) {
      await this.session.abortTransaction();
      this.session.endSession();
    }
  }

  getSession(): ClientSession | undefined {
    return this.session || undefined;
  }

  close() {
    return this.client.close();
  }
}
