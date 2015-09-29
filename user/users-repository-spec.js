var usersRepository = require('./users-repository')

describe('users repository', function() {
  var cassandra = require('cassandra-driver')
  var client = new cassandra.Client({ contactPoints: ['cassandra.local'], keyspace: 'double-loop-demo'});
  var user

  beforeEach(function() {
    user = {
      id: cassandra.types.Uuid.random(),
      firstName: 'Jane',
      lastName: 'Smith'
    }
    client.execute('INSERT INTO users(id, last_name, first_name) values(:id, :lastName, :firstName)', user, {prepare: true},  function(err, result) {  })
  })

  afterEach(function() {
    client.execute('DELETE FROM users WHERE id = ?', [user.id], {prepare: true},  function(err, result) {  })
  })

  describe('get', function() {
    var loadedUser
    beforeEach(function() {
      loadedUser = usersRepository.get(user.id)
    })
    it('should load the user correctly', function() {
      expect(loadedUser).toEqual(user)
    })
  })
})
