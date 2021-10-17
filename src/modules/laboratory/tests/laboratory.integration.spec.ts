describe('laboratory integration', () => {
  describe('GET /laboratories', () => {
    it.todo('should return paginated list of laboratories')
  })

  describe('POST /laboratories', () => {
    it.todo('should return created laboratory')
  })

  describe('PUT /laboratories/:id', () => {
    it.todo('should return 403 when user try to update a not activated laboratory')

    it.todo('should return 404 when user try to update non existent laboratory')

    it.todo('should return paginated list of laboratories')
  })

  describe('DELETE /laboratory/:id', () => {
    it.todo('should return 404 when user try to delete non existent laboratory')

    it.todo('should delete from database the laboratory')
  })
})
