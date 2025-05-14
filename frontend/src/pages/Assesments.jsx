import { useNavigate } from 'react-router-dom';
import {useStore} from '../store/store.js';


export default function Assessments() {
  const { 
    selectedTerm, 
    selectedArea, 
    selectedStudent, 
    filteredQuestions, 
    studentAnswers,
    saveAnswer,
    setStudent
  } = useStore();
  ;''
  const navigate = useNavigate();
  
  // Redirect if needed info is missing
  if (!selectedTerm || !selectedArea || !selectedStudent) {
    navigate('/');
    return null;
  }
  
  const handleAnswer = (questionId, answer) => {
    console.log("API Call Triggered:", questionId, answer); // Debugging log
    saveAnswer(questionId, answer);
  };

  const handleBackButton=()=>{
    setStudent(selectedStudent)
    navigate('/students')
    }
    
  
  return (
    
    <div className="container mx-auto p-6  ">
      <button 
      className="bg-gray-300 hover:bg-gray-400 text-black font-bold  sm:py-2 sm:px-4 rounded mt-2 ml-2 py-1 px-2  "
      onClick={handleBackButton}
    >
      Back to Students
    </button>
     
      
      <div className="space-y-8 mt-10">
      <h1 className="text-3xl font-bold mb-6">Assessment</h1>
        
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(question => (
            <div key={question._id} className="bg-base-200 shadow-md rounded-lg p-6 mt-20">
              <p className="text-lg mb-4">{question.text}</p>
              <p className="text-sm text-gray-500 mb-4">Category: {question.category}</p>
              
              <div className="flex space-x-4">
                <button
                  className={`px-6 py-2 rounded ${
                    studentAnswers[question._id] === true 
                      ? 'bg-green-600 text-white' 
                      : 'bg-base-200 shadow-xl hover:bg-green-500 hover:text-white'
                  }`}
                  onClick={() => handleAnswer(question._id, true)}
                >
                  Yes
                </button>
                
                <button
                  className={`px-6 py-2 rounded ${
                    studentAnswers[question._id] === false 
                      ? 'bg-red-600 text-white' 
                      : 'bg-base-200 shadow-xl hover:bg-red-500 hover:text-white'
                  }`}
                  onClick={() => handleAnswer(question._id, false)}
                >
                  No
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-12 text-gray-500">
            No questions found for the selected criteria.
          </div>
        )}
      </div>
    </div>
  );
}