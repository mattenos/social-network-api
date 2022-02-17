const { connect, connection } = require('mongoose');

connect('mongodb://localhost/usersPosts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = connection;