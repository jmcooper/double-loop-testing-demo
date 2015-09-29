var usersController = require('./users-controller')
var usersRepository = require('./users-repository')
var mockRequire = require('mock-require')
var sinon = require('sinon')
var mockUsersRepository

describe('users api controller', function() {
  it('should have a get function', function() {
    expect(usersController.get).toBeTruthy();
  })

  describe('get', function() {
    var result
    var userFromRepository = {id: 'abc'}

    beforeEach(function() {
      mockUsersRepository = sinon.stub(usersRepository)
      mockUsersRepository.get.returns(userFromRepository)
      mockRequire('./users-repository', mockUsersRepository)
      result = usersController.get('123-abc')
    })
    afterEach(function() {
      sinon.restore(usersRepository)
    })
    it('should get the user from the repository', function() {
      expect(mockUsersRepository.get.calledWith('123-abc')).toBeTruthy()
    })
    it('should map the id', function() {
      expect(result.id).toEqual(userFromRepository.id)
    })
  })
})
