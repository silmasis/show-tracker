const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    site: { type: String, required: true },
    episodes: { type: Number, required: true }
});

const Show = mongoose.model('show', showSchema);

module.exports = Show;