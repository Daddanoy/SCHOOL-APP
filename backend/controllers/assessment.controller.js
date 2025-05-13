import Question from "../models/question.model.js";
import Student from "../models/student.model.js";

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().select("text area term category");
    res.status(200).json(questions);
  } catch (error) {
    console.log("Error in getQuestions controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().select("name assessments");
    res.status(200).json(students);
  } catch (error) {
    console.log("Error retrieving students in controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get answers for a specific student
export const getStudentAnswers = async (req, res) => {
  try {
    const studentId = req.params.id;
    // Get student by id
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student.assessments);
  } catch (error) {
    console.error("Error fetching student answers:", error);
    res.status(500).json({ message: error.message });
  }
};

// Save a student's answer to a question
export const saveStudentAnswer = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { questionId, answer, term } = req.body;

    // Find student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if student has answer already for the question in the db
    const existingAnswerIndex = student.assessments.findIndex(
      a => a.questionId.toString() === questionId
    );

    if (existingAnswerIndex >= 0) { // If there is a match it will return an index of 0 or above, otherwise if no match it will return -1
      // Update existing answer
      student.assessments[existingAnswerIndex].answer = answer;
    } else {
      // Add new assessment
      student.assessments.push({
        questionId,
        answer,
        term,
        date: new Date()
      });
    }

    // Save the updated student doc
    await student.save();

    res.status(200).json({
      message: 'Answer saved successfully',
      assessment: existingAnswerIndex >= 0 
        ? student.assessments[existingAnswerIndex] 
        : student.assessments[student.assessments.length - 1] // Either sends the updated answer, or sends the new answer back to the user
    });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ message: error.message });
  }
};