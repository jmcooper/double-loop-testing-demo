var cassandra = require('cassandra-driver')
var client = new cassandra.Client({ contactPoints: ['cassandra.local'], keyspace: 'double-loop-demo'});

module.exports = {
  get: function(id) {
    
  }
}
