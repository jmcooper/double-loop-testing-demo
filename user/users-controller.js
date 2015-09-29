var usersRepository = require('./users-repository')

module.exports = {
  get: function(id) {
    var user = usersRepository.get(id)
    return {
      id: user.id
    }
  }
}
