import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as faker from 'faker'
import { Exam } from 'src/modules/exam/exam.entity'
import { ExamNotFoundException } from 'src/modules/exam/exceptions/exam-not-found.exception'
import { LaboratoryNotFoundException } from 'src/modules/laboratory/exceptions/laboratory-not-found.exception'
import { Laboratory } from 'src/modules/laboratory/laboratory.entity'
import { DatabaseService } from 'src/modules/test/database.service'
import { TestModule } from 'src/modules/test/test.module'
import * as supertest from 'supertest'
import { Repository } from 'typeorm'
import { ExamLaboratory } from '../exam-laboratory.entity'
import { ExamLaboratoryModule } from '../exam-laboratory.module'

describe('exam laboratory integration tests', () => {
  let app: INestApplication
  let db: DatabaseService
  let examLabRepository: Repository<ExamLaboratory>
  let examRepository: Repository<Exam>
  let labRepository: Repository<Laboratory>
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ExamLaboratoryModule, TestModule]
    }).compile()

    app = module.createNestApplication()
    db = app.get(DatabaseService)

    await db.disableFK()
    await db.synchronize()

    examLabRepository = db.getRepository(ExamLaboratory)
    labRepository = db.getRepository(Laboratory)
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

  function makeLaboratory () {
    const laboratory: Pick<Laboratory, 'name' | 'address' | 'status'> = {
      address: faker.address.streetAddress(),
      name: faker.lorem.word(),
      status: 'active'
    }

    return labRepository.save(laboratory)
  }

  function makeExamLaboratory (exam: number, laboratory: number) {
    const examLaboratory: Pick<ExamLaboratory, 'examId' | 'laboratoryId'> = {
      examId: exam,
      laboratoryId: laboratory
    }

    return examLabRepository.save(examLaboratory)
  }

  describe('GET /exams/:id/laboratories', () => {
    it('should return a list of laboratories', async () => {
      const exam = await makeExam()
      const laboratory = await makeLaboratory()
      await makeExamLaboratory(exam.id, laboratory.id)

      const response = await request.get(`/exams/${exam.id}/laboratories`)

      expect(response.body).toMatchObject([{
        ...laboratory,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }])
    })

    it('should return 404 when exam does not exists', async () => {
      const response = await request.get('/exams/1/laboratories')

      expect(response.statusCode).toBe(404)
    })
  })

  describe('POST /exams/:id/laboratories/:id', () => {
    it('should return 404 when exam does not exists', async () => {
      const response = await request.post('/exams/1/laboratories/1')
      const err = new ExamNotFoundException()

      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject(
        err.getResponse()
      )
    })

    it('should return 404 when laboratory does not exists', async () => {
      const exam = await makeExam()

      const response = await request.post(`/exams/${exam.id}/laboratories/1`)
      const err = new LaboratoryNotFoundException()

      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject(
        err.getResponse()
      )
    })

    it('should create relation of exam and laboratory in database', async () => {
      const exam = await makeExam()
      const lab = await makeLaboratory()

      const response = await request.post(`/exams/${exam.id}/laboratories/${lab.id}`)

      expect(response.statusCode).toBe(204)
    })
  })

  describe('DELETE /exams/:id/laboratories/:id', () => {
    it('should return 404 when exam does not exists', async () => {
      const response = await request.delete('/exams/1/laboratories/1')
      const err = new ExamNotFoundException()

      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject(
        err.getResponse()
      )
    })

    it('should return 404 when laboratory does not exists', async () => {
      const exam = await makeExam()

      const response = await request.delete(`/exams/${exam.id}/laboratories/1`)
      const err = new LaboratoryNotFoundException()

      expect(response.statusCode).toBe(404)
      expect(response.body).toMatchObject(
        err.getResponse()
      )
    })

    it('should delete relation of exam and laboratory in database', async () => {
      const exam = await makeExam()
      const lab = await makeLaboratory()
      await makeExamLaboratory(exam.id, lab.id)

      const response = await request.delete(`/exams/${exam.id}/laboratories/${lab.id}`)

      expect(response.statusCode).toBe(204)
    })
  })
})
