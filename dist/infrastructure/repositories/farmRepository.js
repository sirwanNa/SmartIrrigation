"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmRepository = void 0;
const list_1 = require("../../share/utilities/list");
const mongodb_1 = require("mongodb");
const uri = 'mongodb://localhost:27017'; // replace with your MongoDB URI if needed
const dbName = 'smartIrrigationDb';
const collectionName = 'farms';
class FarmRepository {
    constructor() {
        this.farms = [];
    }
    async getFarmAsync(id) {
        const client = new mongodb_1.MongoClient(uri);
        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            const farm = await collection.findOne({ id: id });
            if (!farm) {
                throw new Error(`Farm with ID ${id} not found`);
            }
            return farm;
        }
        finally {
            await client.close();
        }
    }
    async getFarmsListAsync() {
        const client = new mongodb_1.MongoClient(uri);
        const list = new list_1.List();
        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            const farms = await collection.find().toArray();
            farms.forEach(farm => list.add(farm));
            return list;
        }
        finally {
            await client.close();
        }
    }
    async createAsync(farm) {
        const client = new mongodb_1.MongoClient(uri);
        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            // Check if farm with same id exists
            const exists = await collection.findOne({ id: farm.id });
            if (exists)
                return false;
            // Insert new farm
            const result = await collection.insertOne(farm);
            return result.acknowledged;
        }
        finally {
            await client.close();
        }
    }
    async updateAsync(farm) {
        if (!farm.id)
            return false; // id required to update
        const client = new mongodb_1.MongoClient(uri);
        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            // Update the farm document by matching 'id'
            const result = await collection.updateOne({ id: farm.id }, { $set: farm });
            return result.modifiedCount > 0;
        }
        finally {
            await client.close();
        }
    }
    async removeAsync(id) {
        const client = new mongodb_1.MongoClient(uri);
        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            const result = await collection.deleteOne({ id: id });
            return result.deletedCount > 0;
        }
        finally {
            await client.close();
        }
    }
}
exports.FarmRepository = FarmRepository;
