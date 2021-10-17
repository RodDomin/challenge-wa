import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as faker from 'faker'
import { PaginationFilterDto } from 'src/modules/shared/pagination-filter.dto'
import { DatabaseService } from 'src/modules/test/database.service'
import { TestModule } from 'src/modules/test/test.module'
import * as supertest from 'supertest'
import { Repository } from 'typeorm'
import { CreateExamDto } from '../dtos/create-exam.dto'
import { UpdateExamDto } from '../dtos/update-exam.dto'
import { Exam } from '../exam.entity'
import { ExamModule } from '../exam.module'

describe('exam integration tests', () => {
  let app: INestApplication
  let db: DatabaseService
  let examRepository: Repository<Exam>
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ExamModule, TestModule]
    }).compile()

    app = module.createNestApplication()
    db = app.get(DatabaseService)

    await db.synchronize()

    examRepository = db.getRepository(Exam)

    await app.init()

    request = supertest(app.getHttpServer())
  })

  afterEach(async () => {
    await db.wipe()
  })

  afterAll(async () => {
    await app.close()
  })

  function makeExam () {
    const exam: Pick<Exam, 'name' | 'type' | 'status'> = {
      type: 'clinical',
      name: faker.lorem.word(),
      status: 'active'
    }

    return examRepository.save(exam)
  }

  describe('GET /exams', () => {
    it('should return a paginated list of exams', async () => {
      await makeExam()
      const paginated = new PaginationFilterDto()

      const response = await request.get('/exams')

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        data: [
          {
            id: expect.any(Number),
            name: expect.any(String),
            type: 'clinical',
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

  describe('GET /exams/:id', () => {
    it('should return 404 when exam doesnt exists', async () => {
      const response = await request.get('/exams/1')

      expect(response.statusCode).toBe(404)
    })

    it('should return exam', async () => {
      const exam = await makeExam()

      const response = await request.get(`/exams/${exam.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        id: exam.id,
        name: exam.name,
        type: exam.type,
        status: exam.status,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })

    describe('POST /exams', () => {
      it('should return created exam', async () => {
        const dto: CreateExamDto = {
          name: faker.lorem.word(),
          status: 'active',
          type: 'clinical'
        }

        const response = await request.post('/exams').send(dto)

        expect(response.statusCode).toBe(201)
        expect(response.body).toMatchObject({
          id: expect.any(Number),
          name: dto.name,
          status: 'active',
          type: 'clinical',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      })
    })

    describe('PUT /exams/:id', () => {
      it('should return 404 when user try to update an exam that doesnt exists', async () => {
        const response = await request.put('/exams/1')

        expect(response.statusCode).toBe(404)
      })

      it('should return updated exam', async () => {
        const { id } = await makeExam()

        const dto: UpdateExamDto = {
          name: faker.lorem.word()
        }

        const response = await request.put(`/exams/${id}`).send(dto)

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          id: expect.any(Number),
          name: dto.name,
          status: 'active',
          type: 'clinical',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      })
    })

    describe('DELETE /exams/:id', () => {
      it('should return 404 when try to delete an exam that doesnt exists', async () => {
        const response = await request.delete('/exams/1')

        expect(response.statusCode).toBe(404)
      })

      it('should delete exam from database', async () => {
        const { id } = await makeExam()

        const response = await request.delete(`/exams/${id}`)

        expect(response.statusCode).toBe(204)
      })
    })
  })
})
