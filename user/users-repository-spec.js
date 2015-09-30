var usersRepository = require('./users-repository')

describe('users repository', function() {
  var cassandra = require('cassandra-driver')
  var client = new cassandra.Client({ contactPoints: ['cassandra.local'], keyspace: 'double_loop_demo'});
  var user

  beforeEach(function(done) {
    user = {
      id: cassandra.types.Uuid.random(),
      firstName: 'Jane',
      lastName: 'Smith'
    }
    client.execute('INSERT INTO users(id, last_name, first_name) values(:id, :lastName, :firstName)', user, {prepare: true},  function(err, result) { done();  })
  })

  afterEach(function(done) {
    client.execute('DELETE FROM users WHERE id = ?', [user.id], {prepare: true},  function(err, result) { done() })
  })

  describe('get', function() {
    var loadedUser
    beforeEach(function(done) {
      usersRepository.get(user.id).then(function(user) { loadedUser = user; done() })
    })
    it('should load the id correctly', function() {
      expect(loadedUser.id.equals(user.id)).toBeTruthy()
    })
    it('should load the firstName correctly', function() {
      expect(loadedUser.first_name === user.firstName).toBeTruthy()
    })
    it('should load the lastName correctly', function() {
      expect(loadedUser.last_name === user.lastName).toBeTruthy()
    })
  })
})
