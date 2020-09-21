const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!')
});

const showRouter = require('./routes/shows');
const usersRouter = require('./routes/users');

app.use('/shows', showRouter);
app.use('/users', usersRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( '../client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(port, () => {
    console.log(`Server is running on port: ${PORT}`);
});