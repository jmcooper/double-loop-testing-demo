var usersRepository = require('./users-repository')

module.exports = {
  get: function(id) {
    return usersRepository.get(id)
  }
}
