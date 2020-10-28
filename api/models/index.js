const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const IndexSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
        index: true
    },
    rate: {
        type: Number,
        required: true
    },
});

module.exports = {
    cdi: Mongoose.model('CDI', IndexSchema),
    ipca: Mongoose.model('IPCA', IndexSchema)
}