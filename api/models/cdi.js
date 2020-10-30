const mongoose = require('mongoose');

const IndexSchema = new mongoose.Schema({
    rateValue: {
        type: Number,
        required: true
    },
    rateDate: {
        type: Date,
        required: true,
        unique: true,
        index: true
    }
});

module.exports = {
    cdi: mongoose.model('CDI', IndexSchema)
}