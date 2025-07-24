"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(context, collectionName) {
        this.context = context;
        this.collectionName = collectionName;
    }
    get collection() {
        return this.context.db.collection(this.collectionName);
    }
    stripMongoId(document) {
        const { _id, ...rest } = document;
        return rest;
    }
    async getById(id) {
        const result = await this.collection.findOne({ id }, { session: this.context.getSession() });
        return result ? this.stripMongoId(result) : null;
    }
    async getAll(filter) {
        const results = await this.collection.find(filter !== undefined ? filter : {}, { session: this.context.getSession() }).toArray();
        return results.map(doc => this.stripMongoId(doc));
    }
    async create(entity) {
        const result = await this.collection.insertOne(entity, { session: this.context.getSession() });
        return result.acknowledged;
    }
    async update(entity) {
        const result = await this.collection.updateOne({ id: entity.id }, { $set: entity }, { session: this.context.getSession() });
        return result.modifiedCount > 0;
    }
    async delete(id) {
        const result = await this.collection.deleteOne({ id }, { session: this.context.getSession() });
        return result.deletedCount > 0;
    }
    async checkObjectIsExist(id) {
        const obj = await this.getById(id);
        if (!obj)
            throw new Error(`Object with ID ${id} not found`);
    }
}
exports.BaseRepository = BaseRepository;
