var q = require('q')
var cassandra = require('cassandra-driver')
var client = new cassandra.Client({ contactPoints: ['cassandra.local'], keyspace: 'double_loop_demo'});

module.exports = {
  get: function(id) {
    var deferred = q.defer()
    client.execute('SELECT * FROM users WHERE id = ?', [id], {prepare: true},  function(err, result) { deferred.resolve(result.rows[0])  })
    return deferred.promise
  }
}
