import { InjectConnection } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'

interface Instantiable<T> {
  new(): T
}

export class DatabaseService {
  constructor (
    @InjectConnection() private connection: Connection
  ) {}

  async synchronize () {
    await this.connection.synchronize()
  }

  async wipe () {
    const entities = this.connection.entityMetadatas

    for (const entity of entities) {
      const repository = this.connection.getRepository(entity.name)
      await repository.clear()
    }
  }

  async disableFK () {
    await this.connection.query('PRAGMA foreign_keys=OFF')
  }

  getRepository<T> (entity: Instantiable<T>): Repository<T> {
    return this.connection.getRepository(entity as any)
  }
}
