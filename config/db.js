const mongoose = require('mongoose');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connection
mongoose.connect('mongodb://pollingapp:pollingapp@ds119660.mlab.com:19660/polling_app')
.then(() => {
    console.log('Mongodb connected');
}).catch((err) => {
    console.log(err);
})