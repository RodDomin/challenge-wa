import { ExamLaboratoryService } from '../exam-laboratory.service'
import { ExamLaboratoryDoesNotHaveRelationException } from '../exceptions/exam-laboratory-does-not-have-relation.exception'

describe('exam laboratory service', () => {
  let service: ExamLaboratoryService
  let fakeRepository
  let fakeExamService
  let fakeLabService

  beforeAll(() => {
    fakeRepository = {}
    fakeExamService = {
      findOne: jest.fn()
    }

    fakeLabService = {
      findOne: jest.fn()
    }

    service = new ExamLaboratoryService(
      fakeRepository,
      fakeExamService,
      fakeLabService
    )
  })

  it('should list labs from exam', async () => {
    fakeRepository.find = jest.fn().mockResolvedValue([])

    await service.list(1)

    expect(fakeRepository.find).toHaveBeenCalledWith({
      where: {
        examId: 1
      },
      relations: ['laboratory']
    })
  })

  it('should create relation by exam and lab', async () => {
    fakeRepository.save = jest.fn()

    await service.create(1, 2)

    expect(fakeRepository.save).toHaveBeenCalledWith({
      examId: 1,
      laboratoryId: 2
    })
  })

  it('should throw error when exam does not have relation with lab', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue(undefined)

    expect(service.delete(1, 2)).rejects.toThrow(ExamLaboratoryDoesNotHaveRelationException)
  })

  it('should delete relation of lab and exam', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue({ id: 5 })
    fakeRepository.delete = jest.fn()

    await service.delete(1, 2)

    expect(fakeRepository.delete).toHaveBeenCalledWith(5)
  })
})
