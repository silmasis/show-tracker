const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connevtion established successfully')
});

const showRouter = require('./routes/shows');
const usersRouter = require('./routes/users');

app.use('/shows', showRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
    
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});