var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secQestion1: {
        type: String,
        required: true
    }, secQestion1Answer: {
        type: String,
        required: true
    }, secQestion2: {
        type: String,
        required: true
    }, secQestion2Answer: {
        type: String,
        required: true
    },
    // `Budget` is an object that stores a Budget id
    // The ref property links the ObjectId to the Budget model
    // This allows us to populate the User with an associated Budget
    budgets:
        [
            {
                // Store ObjectIds in the array
                type: Schema.Types.ObjectId,
                // The ObjectIds will refer to the ids in the Budget model
                ref: "Budget"
            }
        ]
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
