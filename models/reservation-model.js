const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservation_schema = new Schema({
    name: {
        type: String,
        ref: 'reservation',
        required: true
    
    },
    start: {
        type: Date,
        required: true 
    },

    end: {
        type: Date,
        required: true 
    },

    duration: {
        type: String,
        required: false 
    },
    comment: {
        type: String,
        required: false 
    },

    

});


const reservation_model = new mongoose.model('reservation', reservation_schema);

module.exports = reservation_model;