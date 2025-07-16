import { IFarmRepository } from '../../core/application/interface/repositories/iFarmRepository';
import { FarmDTO } from '../../core/application/dTOs/farmDTO';
import { List } from '../../share/utilities/list';

import { MongoClient, ObjectId } from 'mongodb';
const uri = 'mongodb://localhost:27017'; // replace with your MongoDB URI if needed
const dbName = 'smartIrrigationDb';
const collectionName = 'farms';


export class FarmRepository implements IFarmRepository {
  private farms: FarmDTO[] = [];

  public async getFarmAsync(id: number): Promise<FarmDTO> {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection<FarmDTO>(collectionName);

      const farm = await collection.findOne({ id: id });

      if (!farm) {
        throw new Error(`Farm with ID ${id} not found`);
      }
      return farm;
    } finally {
      await client.close();
    }
  }

  public async getFarmsListAsync(): Promise<List<FarmDTO>> {
    const client = new MongoClient(uri);
    const list = new List<FarmDTO>();

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection<FarmDTO>(collectionName);

      const farms = await collection.find().toArray();

      farms.forEach(farm => list.add(farm));

      return list;
    } finally {
      await client.close();
    }
  }

  public async createAsync(farm: FarmDTO): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection<FarmDTO>(collectionName);

      // Check if farm with same id exists
      const exists = await collection.findOne({ id: farm.id });
      if (exists) return false;

      // Insert new farm
      const result = await collection.insertOne(farm);

      return result.acknowledged;
    } finally {
      await client.close();
    }
  }

  public async updateAsync(farm: FarmDTO): Promise<boolean> {
    if (!farm.id) return false; // id required to update

    const client = new MongoClient(uri);

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection<FarmDTO>(collectionName);

      // Update the farm document by matching 'id'
      const result = await collection.updateOne(
        { id: farm.id },
        { $set: farm }
      );

      return result.modifiedCount > 0;
    } finally {
      await client.close();
    }
  }

  public async removeAsync(id: number): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const result = await collection.deleteOne({ id: id });

      return result.deletedCount > 0;
    } finally {
      await client.close();
    }
  }
}
