var usersController = require('./users-controller')
var usersRepository = require('./users-repository')
var mockRequire = require('mock-require')
var sinon = require('sinon')
var q = require('q')
var mockUsersRepository

describe('users api controller', function() {
  it('should have a get function', function() {
    expect(usersController.get).toBeTruthy();
  })

  describe('get', function() {
    var result
    var userFromRepository = {id: 'abc'}

    beforeEach(function(done) {
      var deferred = q.defer()
      mockUsersRepository = sinon.stub(usersRepository)
      mockUsersRepository.get.returns(deferred.promise)
      mockRequire('./users-repository', mockUsersRepository)

      usersController.get('123-abc').then(function(response) {
        result = response
        done()
      })

      deferred.resolve(userFromRepository)
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
