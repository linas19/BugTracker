const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const dbConfig = require('./config/db.config.js');
const routes = require('./routes/api')

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/project.routes')(app);
require('./routes/ticket.routes')(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bugtracker 2 application." });
});
const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(process.env.MONGODB_URI || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
// const MONGODB_URI = 'mongodb+srv://linas19:kaledos@bugtrackerdb.6gp90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// mongoose.connect('mongodb://localhost/mern_youtube', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
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
app.get('/jwt', (req, res) => {
  const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}
app.listen(PORT, console.log(`server is startting at: ${PORT}`))

