var usersController = require('./users-controller')()

describe('users api controller', function() {
  it('should have a get function', function() {
    expect(usersController.get).toBeTruthy();
  })
})
