import Question from "../models/question.model.js";
import Student from "../models/student.model.js";




export const getQuestions = async(req,res)=>{
  try { 
    const questions = await Question.find().select("text area term category")
    res.status(200).json(questions)
  } catch (error) {
    console.log("Error in getQuestions controller")
    res.status(500).json({message:"Internal server error"})
  }
}

export const getStudents = async(req,res)=>{
try {
  const students = await Student.find().select("name assessments")
  res.status(200).json(students)
} catch (error) {
  console.log("Error retreiving students in controller ")
  res.status(500).json({message:"Internal server error"})
}
}

export const getStudentAnswers = async (req,res) =>{
  try {
    const studentId = req.params.id
    //get student by id
    const student = await Student.findById(studentId)

    if(!student){
      return res.status(404).json({message:'Student not found'})
    }

    res.json(student.assessments)
  } catch (error) {
    console.error("Error fetching student messages:" ,error)
    res.status(500).json({message:error.message})
  }
}

export const saveStudentAnswer = async (req, res)=>{
  try{
    const studentId = req.params.id
    const{questionId , answer, term } = req.body

    //find student
    const student = await Student.findById(studentId)

    if(!studentId){
      return res.status(404).json({message:'student not found'})
    }

    //check if student has answer already for the question in the db
    const existingAnswerIndex = student.assessments.findIndex(//find the student assessment , then check if the question matches the requested questionid
      a=> a.questionId.toString() === questionId
    )

    if(existingAnswerIndex >=0){ //if there is a match it will return an index of 0 or above, otherwise if no match it will return -1

      //update existing answer
      student.assessments[existingAnswerIndex].answer = answer 
    }else{
      //aadd new user
      student.assessments.push({
        questionId,
        answer, 
        term,
        date: new Date()
      })
    }


    //save the updated student doc

    await student.save();

    res.status(200).json({
      message: 'answer saved successfully', 
      assessment: existingAnswerIndex >=0? student.assessments[existingAnswerIndex] : student.assessments[student.assessments.length - 1] // either sends the updated answer , or send the the new answer back to the user
    })



  }catch(error){
    console.error('Error saving answer:', error);
    res.status(500).json({ message: error.message });
  }
}