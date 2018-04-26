var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var studentSchema = new Schema({
  // `student name` is required and of type String
  studentName: {
    type: String,
    required: true,
    unique: false
  },
  // All transactions: buy/sell
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  classNumber: {
    type: String,
    required: true
  },
  // `transaction` is an object that stores a transaction id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Student table with an associated Note
  transaction: {
    type: Schema.Types.ObjectId,
    ref: "transaction"
  },
  transaction: {
    type: Schema.Types.ObjectId,
    ref: "transaction"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Student = mongoose.model("student", studentSchema);

// Export the Article model
module.exports = Student;
