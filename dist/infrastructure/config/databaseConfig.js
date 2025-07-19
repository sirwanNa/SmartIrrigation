"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConfig = void 0;
class MongoConfig {
    static getSettings() {
        return {
            uri: this.uri,
            dbName: this.dbName
        };
    }
}
exports.MongoConfig = MongoConfig;
MongoConfig.uri = process.env.MONGO_URL || "mongodb://localhost:27017";
MongoConfig.dbName = process.env.MONGO_DB_NAME || "smartIrrigation";
