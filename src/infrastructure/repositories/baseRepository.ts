// BaseRepository.ts
import { BaseEntity } from '../../core/domain/entities/baseEntity';
import { UnitOfWork } from '../data/unitofWork';
import { Filter, OptionalUnlessRequiredId, WithId } from 'mongodb';
import { MongoContext } from "../data/mongoContext";

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(
    protected readonly context: MongoContext,
    protected readonly collectionName: string
  ) {}

  protected get collection() {
    return this.context.db.collection<T>(this.collectionName);
  }

  protected stripMongoId(document: WithId<T>): T {
    const { _id, ...rest } = document;
    return rest as unknown as T;
  }

  public async getById(id: number): Promise<T | null> {
    const result = await this.collection.findOne(
      { id } as Filter<T>,
      { session: this.context.getSession() }
    );

    return result ? this.stripMongoId(result as WithId<T>) : null;
  }

  public async getAll(filter?:Filter<T>): Promise<T[]> {
    const results = await this.collection.find(
      filter !== undefined? filter:{},
      { session: this.context.getSession() }
    ).toArray();

    return results.map(doc => this.stripMongoId(doc as WithId<T>));
  }

  public async create(entity: T): Promise<boolean> {
    const result = await this.collection.insertOne(
       entity as unknown as OptionalUnlessRequiredId<T>,
      { session: this.context.getSession() }
    );
    return result.acknowledged;
  }

  public async update(entity: T): Promise<boolean> {
    const result = await this.collection.updateOne(
      { id: entity.id } as Filter<T>,
      { $set: entity },
      { session: this.context.getSession() }
    );
    return result.modifiedCount > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.collection.deleteOne(
      { id } as Filter<T>,
      { session: this.context.getSession() }
    );
    return result.deletedCount > 0;
  }
 protected async checkObjectIsExist(id: number) {
    const obj = await this.getById(id);
    if (!obj) throw new Error(`Object with ID ${id} not found`);
  }
}
