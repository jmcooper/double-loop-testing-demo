var usersController = require('./users-controller')

describe('users api controller', function() {
  var cassandra = require('cassandra-driver')
  var client = new cassandra.Client({ contactPoints: ['cassandra.local'], keyspace: 'double-loop-demo'});
  var user

  beforeEach(function() {
    user = {
      id: cassandra.types.Uuid.random(),
      firstName: 'John',
      lastName: 'Doe'
    }
    client.execute('INSERT INTO users(id, last_name, first_name) values(:id, :lastName, :firstName)', user, {prepare: true},  function(err, result) {  })
  })

  afterEach(function() {
    client.execute('DELETE FROM users WHERE id = ?', [user.id], {prepare: true},  function(err, result) {  })
  })

  describe('get user', function() {
    var returnedUser
    beforeEach(function() {
       returnedUser = usersController.get(user.id)
    })

    it('should map the user id', function() {
      expect(returnedUser.id).toEqual(user.id)
    })

    it('should map the first name', function() {
      expect(returnedUser.firstName).toEqual(user.firstName)
    })

    it('should map the last name', function() {
      expect(returnedUser.lastName).toEqual(user.lastName)
    })
  })
})
