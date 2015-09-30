var usersRepository = require('./users-repository')
var q = require('q')

module.exports = {
  get: function(id) {
    var deferred = q.defer()
    var promise = usersRepository.get(id)
    console.log(promise)
    var user = promise
      .then(function(userFromRepository){
        console.log('**********')
        deferred.resolve({id: userFromRepository.id})
      }, function() {console.log('wat')})
    return deferred.promise
  }
}
