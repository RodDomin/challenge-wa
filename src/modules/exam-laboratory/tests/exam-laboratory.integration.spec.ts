describe('exam laboratory integration tests', () => {
  describe('GET /exams/:id/laboratories', () => {
    it.todo('should return a list of laboratories')

    it.todo('should return 404 when exam does not exists')
  })

  describe('POST /exams/:id/laboratories/:id', () => {
    it.todo('should return 404 when exam does not exists')

    it.todo('should return 404 when laboratory does not exists')

    it.todo('should create relation of exam and laboratory in database')
  })

  describe('DELETE /exams/:id/laboratories/:id', () => {
    it.todo('should return 404 when exam does not exists')

    it.todo('should return 404 when laboratory does not exists')

    it.todo('should delete relation of exam and laboratory in database')
  })
})
