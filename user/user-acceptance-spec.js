var usersController = require('./users-controller')

describe('users api controller', function() {
  var cassandra = require('cassandra-driver')
  var client = new cassandra.Client({ contactPoints: ['cassandra.local'], keyspace: 'double_loop_demo'});
  var savedUser

  beforeEach(function(done) {
    savedUser = {
      id: cassandra.types.Uuid.random(),
      firstName: 'John',
      lastName: 'Doe'
    }
    client.execute('INSERT INTO users(id, last_name, first_name) values(:id, :lastName, :firstName)', savedUser, {prepare: true},  function(err, result) { done() })
  })

  afterEach(function(done) {
    client.execute('DELETE FROM users WHERE id = ?', [savedUser.id], {prepare: true},  function(err, result) { done() })
  })

  describe('get user', function() {
    var returnedUser
    beforeEach(function(done) {
       usersController.get(savedUser.id).then(function(user) { returnedUser = user; done() })
    })

    it('should map the user id', function() {
      expect(returnedUser.id.equals(savedUser.id)).toBeTruthy()
    })

    it('should map the first name', function() {
      expect(returnedUser.firstName).toEqual(savedUser.firstName)
    })

    it('should map the last name', function() {
      expect(returnedUser.lastName).toEqual(savedUser.lastName)
    })
  })
})
