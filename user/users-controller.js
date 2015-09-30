var usersRepository = require('./users-repository')
var q = require('q')

module.exports = {
  get: function(id) {
    var deferred = q.defer()
    usersRepository.get(id).then(function(user){ deferred.resolve({id: user.id}) })
    return deferred.promise
  }
}
