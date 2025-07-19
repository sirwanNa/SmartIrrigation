"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoContext = void 0;
const mongodb_1 = require("mongodb");
const databaseConfig_1 = require("../config/databaseConfig");
class MongoContext {
    constructor() {
        this.session = null;
        var dataBaseConfig = databaseConfig_1.MongoConfig.getSettings();
        this.client = new mongodb_1.MongoClient(dataBaseConfig.uri);
        this.db = this.client.db(dataBaseConfig.dbName);
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
    getSession() {
        return this.session || undefined;
    }
    close() {
        return this.client.close();
    }
}
exports.MongoContext = MongoContext;
