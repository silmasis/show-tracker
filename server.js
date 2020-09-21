const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const config = require("./config/key");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log(err));

const showRouter = require('./routes/shows');
const usersRouter = require('./routes/users');

app.use('/shows', showRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});