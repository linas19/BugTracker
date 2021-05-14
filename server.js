const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api')
// const MONGODB_URI = 'mongodb+srv://linas19:kaledos@bugtrackerdb.6gp90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect('mongodb://localhost/mern_youtube', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose.connect(MONGODB_URI || 'mongodb://localhost/mern_youtube', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use('/api', routes)
app.listen(PORT, console.log(`server is startting at: ${PORT}`))
