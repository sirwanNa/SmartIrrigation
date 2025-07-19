export interface CustomMongoSettings {
  uri: string;
  dbName: string;
}

export class MongoConfig {
  private static readonly uri: string = process.env.MONGO_URL || "mongodb://localhost:27017";
  private static readonly dbName: string = process.env.MONGO_DB_NAME || "smartIrrigation";

  public static getSettings(): CustomMongoSettings {
    return {
      uri: this.uri,
      dbName: this.dbName
    };
  }
}