var usersRepository = require('./users-repository')

module.exports = {
  get: function(id) {
    usersRepository.get(id)
  }
}
