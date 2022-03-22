const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    flightnum: {
        type: Number,
         
    },
    source:{
        type:String,
        trim: true,
        required: true,
        maxlength: 32

    },
    destination:{
        type:String,
        trim: true,
        required: true,
        maxlength: 32

    },
    
    price:{
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    
    stock:{
        type: Number,

    },
    sold:{
        type: Number,
        default: 0
    },
    date:{
        type: String,
        default: Date.now().toString()
    }
},{timestamps: true})

module.exports = mongoose.model("Tickets",ticketSchema);