import * as faker from 'faker'
import { LaboratoryNotActiveException } from '../exceptions/laboratory-not-active.exception'
import { LaboratoryNotFoundException } from '../exceptions/laboratory-not-found.exception'
import { LaboratoryService } from '../laboratory.service'

describe('laboratory service', () => {
  let service: LaboratoryService
  let fakeRepository
  let fakeBuilder
  let fakePaginatedBuilder

  beforeAll(() => {
    fakeRepository = {}
    fakeBuilder = {}
    fakePaginatedBuilder = {}

    service = new LaboratoryService(fakeRepository, fakeBuilder, fakePaginatedBuilder)
  })

  it('should throw error when user cant find one user', () => {
    fakeRepository.findOne = jest.fn().mockReturnValue(undefined)

    expect(service.findOne(1)).rejects.toThrow(LaboratoryNotFoundException)
  })

  it('should return data from repository', async () => {
    fakeRepository.findOne = jest.fn().mockReturnValue({})

    await service.findOne(1)

    expect(fakeRepository.findOne).toHaveBeenCalledWith(1)
  })

  it('should create lab', async () => {
    fakeRepository.save = jest.fn().mockResolvedValue({})

    await service.create({
      address: faker.address.streetAddress(),
      name: faker.lorem.word(),
      status: 'active'
    })

    expect(fakeRepository.save).toHaveBeenCalled()
  })

  it('should throw error when user try to update a non existent laboratory', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue(undefined)

    expect(service.update(1, {
      address: faker.address.streetAddress(),
      name: faker.lorem.word(),
      status: 'active'
    })).rejects.toThrow(LaboratoryNotFoundException)
  })

  it('should throw error when user try to update a inactive laboratory', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue({
      isActive: () => false
    })

    expect(service.update(1, {
      address: faker.address.streetAddress(),
      name: faker.lorem.word(),
      status: 'active'
    })).rejects.toThrow(LaboratoryNotActiveException)
  })

  it('should call save on laboratory repository', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue({
      isActive: () => true
    })

    await service.update(1, {
      address: faker.address.streetAddress(),
      name: faker.lorem.word(),
      status: 'active'
    })

    expect(fakeRepository.save).toHaveBeenCalled()
  })

  it('should throw not found error if user try do delete a not found lab', () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue(undefined)

    expect(service.delete(1)).rejects.toThrow(LaboratoryNotFoundException)
  })

  it('should call delete', async () => {
    fakeRepository.findOne = jest.fn().mockResolvedValue({})
    fakeRepository.delete = jest.fn()

    await service.delete(1)

    expect(fakeRepository.delete).toHaveBeenCalled()
  })
})
