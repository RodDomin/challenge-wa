import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Repository } from 'typeorm'
import * as supertest from 'supertest'
import * as faker from 'faker'
import { DatabaseService } from 'src/modules/test/database.service'
import { TestModule } from 'src/modules/test/test.module'
import { Laboratory } from '../laboratory.entity'
import { LaboratoryModule } from '../laboratory.module'
import { PaginationFilterDto } from 'src/modules/shared/pagination-filter.dto'
import { CreateLaboratoryDto } from '../dtos/create-laboratory.dto'
import { UpdateLaboratoryDto } from '../dtos/update-laboratory.dto'

describe('laboratory integration', () => {
  let app: INestApplication
  let db: DatabaseService
  let labRepository: Repository<Laboratory>
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LaboratoryModule, TestModule]
    }).compile()

    app = module.createNestApplication()
    db = app.get(DatabaseService)

    await db.synchronize()

    labRepository = db.getRepository(Laboratory)

    await app.init()

    request = supertest(app.getHttpServer())
  })

  afterEach(async () => {
    await db.wipe()
  })

  afterAll(async () => {
    await app.close()
  })

  function makeLaboratory () {
    const laboratory: Pick<Laboratory, 'name' | 'address' | 'status'> = {
      address: faker.address.streetAddress(),
      name: faker.lorem.word(),
      status: 'active'
    }

    return labRepository.save(laboratory)
  }

  describe('GET /laboratories/:id', () => {
    it('should return 404 when user try get on a non existent laboratory', async () => {
      const response = await request.get('/laboratories/1')

      expect(response.statusCode).toBe(404)
    })

    it('should return laboratory', async () => {
      const laboratory = await makeLaboratory()

      const response = await request.get(`/laboratories/${laboratory.id}`)

      expect(response.body).toMatchObject({
        id: laboratory.id,
        name: expect.any(String),
        status: 'active',
        address: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })
  })

  describe('GET /laboratories', () => {
    it('should return paginated list of laboratories', async () => {
      const paginated = new PaginationFilterDto()

      await makeLaboratory()

      const response = await request.get('/laboratories')

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        data: [
          {
            id: expect.any(Number),
            name: expect.any(String),
            address: expect.any(String),
            status: 'active',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }
        ],
        totalPages: 1,
        page: Number(paginated.page),
        limit: Number(paginated.limit),
        totalDocs: 1
      })
    })
  })

  describe('POST /laboratories', () => {
    it('should return created laboratory', async () => {
      const dto: CreateLaboratoryDto = {
        address: faker.address.streetAddress(),
        name: faker.lorem.word(),
        status: 'active'
      }

      const response = await request.post('/laboratories').send(dto)

      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        address: expect.any(String),
        status: 'active',
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })
  })

  describe('PUT /laboratories/:id', () => {
    it('should return 403 when user try to update a not activated laboratory', async () => {
      const lab = await makeLaboratory()

      lab.status = 'inactive'

      await labRepository.save(lab)

      const dto: UpdateLaboratoryDto = {
        name: faker.lorem.word()
      }

      const response = await request.put(`/laboratories/${lab.id}`).send(dto)

      expect(response.statusCode).toBe(403)
    })

    it('should return 404 when user try to update non existent laboratory', async () => {
      const response = await request.put('/laboratories/1')

      expect(response.statusCode).toBe(404)
    })

    it('should return updated laboratory', async () => {
      const lab = await makeLaboratory()

      const dto: UpdateLaboratoryDto = {
        name: faker.lorem.word()
      }

      const response = await request.put(`/laboratories/${lab.id}`).send(dto)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        id: expect.any(Number),
        name: dto.name,
        address: expect.any(String),
        status: 'active',
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })
  })

  describe('DELETE /laboratory/:id', () => {
    it('should return 404 when user try to delete non existent laboratory', async () => {
      const response = await request.delete('/laboratories/1')

      expect(response.statusCode).toBe(404)
    })

    it('should delete from database the laboratory', async () => {
      const lab = await makeLaboratory()

      const response = await request.delete(`/laboratories/${lab.id}`)

      expect(response.statusCode).toBe(204)
    })
  })
})
