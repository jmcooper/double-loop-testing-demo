var usersController = require('./users-controller')
var usersRepository = require('./users-repository')
var mockRequire = require('mock-require')
var mockUsersRepository

describe('users api controller', function() {
  it('should have a get function', function() {
    expect(usersController.get).toBeTruthy();
  })

  describe('get', function() {
    var result
    beforeEach(function() {
      mockUsersRepository = sinon.stub(usersRepository)
      mockRequire.mock('./users-repository', mockUsersRepository)
      usersController.get('123-abc')
    })
    it('should get the user from the repository', function() {
      expect(usersRepository.get.calledWith('123-abc'))
    })
  })
})
