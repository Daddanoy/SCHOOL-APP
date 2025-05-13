import mongoose from 'mongoose'
import Question from "./question.model.js";

// Student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  classGroup: {
    type: String,
    required: true
  },

  dateOfBirth: {
    type: Date,
    required: true
  },

  
  // Store answers in an array of assessment objects
  assessments: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Question,
      required: true
    },
    answer: {
      type: Boolean,  // Yes/No (true/false)
      required: true
    },
    term: {
      type: String,
      required: true,
      enum: ["autumn", "spring", "summer"]
    },
    
    date: {
      type: Date,
      default: Date.now
    }
  }]
});
if (mongoose.models.Student) {
  mongoose.deleteModel('Student');
}
const Student = mongoose.model("Student", studentSchema)

export default Student