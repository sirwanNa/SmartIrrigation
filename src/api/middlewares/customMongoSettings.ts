import * as fs from 'fs';
import * as path from 'path';

interface CustomMongoSettings {
  uri: string;
  dbName: string;
}

export function getMongoConfig(): CustomMongoSettings {
  const tsconfigPath = path.resolve(__dirname, '../../../tsconfig.json');
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

  const settings = tsconfig.compilerOptions?.customMongoSettings;
  if (!settings || !settings.uri || !settings.dbName) {
    throw new Error("MongoDB settings not found in tsconfig.json");
  }

  return {
    uri: settings.uri,
    dbName: settings.dbName
  };
}
