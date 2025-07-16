"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(uow, collectionName) {
        this.uow = uow;
        this.collectionName = collectionName;
    }
    get collection() {
        return this.uow.context.db.collection(this.collectionName);
    }
    stripMongoId(document) {
        const { _id, ...rest } = document;
        return rest;
    }
    async getById(id) {
        const result = await this.collection.findOne({ id }, { session: this.uow.getSession() });
        return result ? this.stripMongoId(result) : null;
    }
    async getAll() {
        const results = await this.collection.find({}, { session: this.uow.getSession() }).toArray();
        return results.map(doc => this.stripMongoId(doc));
    }
    async create(entity) {
        const result = await this.collection.insertOne(entity, { session: this.uow.getSession() });
        return result.acknowledged;
    }
    async update(entity) {
        const result = await this.collection.updateOne({ id: entity.id }, { $set: entity }, { session: this.uow.getSession() });
        return result.modifiedCount > 0;
    }
    async delete(id) {
        const result = await this.collection.deleteOne({ id }, { session: this.uow.getSession() });
        return result.deletedCount > 0;
    }
}
exports.BaseRepository = BaseRepository;
