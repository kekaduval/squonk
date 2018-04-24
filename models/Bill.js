var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new BillSchema object
// This is similar to a Sequelize model
var BillSchema = new Schema({

    billName: {
        type: String,
        required: true
    },

    billAmount: {
        type: Number,
        required: true
    },
    actualAmount: {
        type: Number,
    },
    
    billStatic: {
        type: Boolean,
        required: true,
        default: false,
    },
});

// This creates our model from the above schema, using mongoose's model method
var Bill = mongoose.model("Bill", BillSchema);

// Export the Bill model
module.exports = Bill;
