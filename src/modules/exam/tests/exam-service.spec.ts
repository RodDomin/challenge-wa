import { ExamService } from '../exam.service'
import * as faker from 'faker'
import { ExamNotFoundException } from '../exceptions/exam-not-found.exception'

describe('exam service tests', () => {
  let service: ExamService
  let fakeRepository
  let fakeBuilder
  let fakePaginatedBuilder

  beforeAll(() => {
    fakeRepository = {}
    fakeBuilder = {}
    fakePaginatedBuilder = {}

    service = new ExamService(fakeRepository, fakeBuilder, fakePaginatedBuilder)
  })

  it('should throw error when user cant find one exam', () => {
    fakeRepository.findOne = jest.fn().mockReturnValue(undefined)

    expect(service.findOne(1)).rejects.toThrow(ExamNotFoundException)
  })

  it('should return data from repository', async () => {
    fakeRepository.findOne = jest.fn().mockReturnValue({})

    await service.findOne(1)

    expect(fakeRepository.findOne).toHaveBeenCalledWith(1)
  })

  it('should create exam', async () => {
    fakeRepository.save = jest.fn().mockResolvedValue({})

    await service.create({
      type: 'clinical',
      name: faker.lorem.word(),
      status: 'active'
    })

    expect(fakeRepository.save).toHaveBeenCalled()
  })

  it('should throw error when user try to update a non existent exam', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue(undefined)

    expect(service.update(1, {
      type: 'clinical',
      name: faker.lorem.word(),
      status: 'active'
    })).rejects.toThrow(ExamNotFoundException)
  })

  it('should throw error when user try to update a non existent laboratory', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue(undefined)

    expect(service.update(1, {
      type: 'clinical',
      name: faker.lorem.word(),
      status: 'active'
    })).rejects.toThrow(ExamNotFoundException)
  })

  it('should call save on exam repository', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue({
      isActive: () => true
    })

    await service.update(1, {
      type: 'clinical',
      name: faker.lorem.word(),
      status: 'active'
    })

    expect(fakeRepository.save).toHaveBeenCalled()
  })

  it('should throw not found error if user try do delete a not found exam', () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue(undefined)

    expect(service.delete(1)).rejects.toThrow(ExamNotFoundException)
  })

  it('should call delete', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue({})
    fakeRepository.delete = jest.fn()

    await service.delete(1)

    expect(fakeRepository.delete).toHaveBeenCalled()
  })

  it('should call save on laboratory repository', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue({
      isActive: () => true
    })

    await service.update(1, {
      type: 'clinical',
      name: faker.lorem.word(),
      status: 'active'
    })

    expect(fakeRepository.save).toHaveBeenCalled()
  })
})
