const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tktks', {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true
});
