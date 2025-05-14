import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../lib/axios.js";
import {useStore} from "../store/store.js";
import { ChevronDown, ChevronUp } from "lucide-react"; 


const StudentsTable = () => {
  const [students, setStudents] = useState([])
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTerm, setCurrentTerm] = useState('')
  const [openStudentId, setOpenStudentId] = useState(null);

  


  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        setIsLoading(true) 
        
       const [stud, ques] = await Promise.all([
        axiosInstance.get("/students"),
         axiosInstance.get("/questions")
       ])

       setStudents(stud.data)
       setQuestions(ques.data)
       
      } catch (error) {
        console.error("error fetching data", error)
      }finally{
        setIsLoading(false)
      }
    }
    fetchData()
  },[])

  
  console.log(students)
  console.log(questions)


  const questionLookup = questions.reduce((acc,q)=>{//turns the array of questions into an object that can access the inner data and returns the question id as a key , with the object containing the info as a value.  Map question IDs to full question objects
    acc[q._id] = q;
    return acc

  },{})

  if(isLoading) return <div>Loading...</div>


  // const test = questionLookup['6804d0f676c01582ada61240']?.text //this prints the question by going into the qid and getting the text value
  // console.log(test)

  // console.log(questionLookup)


 // const currentTerm = 'autumn';

  const filteredStudents = students
  .filter(student => student.assessments?.some(a => a.term === currentTerm))   // keep the students that have 1 or more assessments for the current selected
  .map(student => ({ // for each student, keep only their current-term assessments
    ...student,//copy all properties
    assessments: student.assessments.filter(a => a.term === currentTerm)// overwrite assessments with assessments that match the current term 

   

  }));



  const questionTexts = [ //Extract the unique questions
    ...new Set( // Remove duplicates and converts it back to an array
      filteredStudents.flatMap(student =>
        student.assessments
          .map(a => questionLookup[a.questionId]?.text) // Get text
          .filter(Boolean) // Remove undefined/null
      )
    )
  ];
//   console.log(questionLookup)
// console.log(filteredStudents)
//   console.log(questionTexts)

   // Initialize row with student info + all questions set to 'N/A'
  const tableRows = filteredStudents.map(student=>{
    const row = {
      studentId:student._id,
      studentName:student.name,
      ...Object.fromEntries(questionTexts.map(text=>[text,'NA'])) //makes all the cells answers 'N/A' by default
    };

    student.assessments.forEach(assessment=>{
      const question = questionLookup[assessment.questionId];
      if(question){
        row[question.text] = assessment.answer //Overwrite 'N/A' in the row object if there is an answer to the question
      }
    })

//     ["Listens to stories", "Can hold pencil"] → 
// [
//   ["Listens to stories", "N/A"],
//   ["Can hold pencil", "N/A"]
// ]


return row

  })

 function handleSelectTerm(e){
setCurrentTerm(e)
 }


 const getStatusIcon = (value) => {
  if (value === true) return "✅";
  if (value === false) return "❌";
  return "-";
 }

 const toggleOpen = (id) => {
  setOpenStudentId(openStudentId === id ? null : id);
};

  
  return (
    <>
     <div className="w-full bg-base-100">
      {/* Responsive Term Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-4 ">
        {['autumn', 'spring', 'summer'].map((term, key) => (
          <button 
            onClick={() => handleSelectTerm(term)} 
            key={key} 
            className={`shadow-md px-3 py-2 sm:px-5 sm:py-3 rounded-lg capitalize hover:cursor-pointer
                        ${currentTerm === term ? 'bg-primary text-primary-content' : 'bg-base-200'} 
                        transition-colors w-auto text-sm sm:text-base`}
          >
            {term}
          </button>
        ))}
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-10 bg-base-300 rounded-lg mx-2">
          {currentTerm ? `No students found for ${currentTerm} term` : 'Please select a term'}
        </div>
      ) : (
        <>
          {/* Mobile View: Cards */}
<div className="md:hidden space-y-4 px-2">
  {tableRows.map(row => (
    <div 
      key={row.studentId} 
      className="bg-base-200 rounded-lg shadow-md overflow-hidden"
    >
      <button
        onClick={() => toggleOpen(row.studentId)}
        className="w-full bg-base-300 p-3 font-bold text-lg border-b border-base-content/20 flex justify-between items-center cursor-pointer"
      >
        {row.studentName}
        {openStudentId === row.studentId ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {openStudentId === row.studentId && (
        <div className="divide-y divide-base-content/10">
          {questionTexts.map(text => (
            <div 
              key={`${row.studentId}-${text}`} 
              className="p-3 flex justify-between items-center"
            >
              <div className="text-sm pr-2">{text}</div>
              <div className="text-lg">
                {getStatusIcon(row[text])}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>
          {/* Desktop View: Table */}
          <div className="hidden md:block ">
            <div className="overflow-auto rounded-lg shadow-md style={{ maxHeight: '70vh' }}' }}">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-base-300 sticky top-0 z-10 ">
                    {/* Student Column Header */}
                    <th className=" p-3 text-left border-b border-base-content/20  ">Student</th>

                    {/* Question Headers */}
                    {questionTexts.map(text => (
                      <th
                        key={text}
                        className="sticky top-0 z-10 p-3 text-center border-b border-base-content/20 bg-base-300  "
                      >
                        {text}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-base-200">
                  {tableRows.map(row => (
                    <tr key={row.studentId} className="hover:bg-base-300 ">

                           {/* Student Name Cell */}
                      <td className="sticky left-0 z-10 p-3 font-medium border-b border-base-content/10 bg-base-200">
                        {row.studentName}
                      </td>

                      {/* Question Cells */}
                      {questionTexts.map(text => (
                        <td
                          key={`${row.studentId}-${text}`}
                          className="p-3 text-center border-b border-base-content/10"
                        >
                          {getStatusIcon(row[text])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
    </>
    
  )
}

export default StudentsTable




{/* <div className="min-h-screen">
{students.map(student=>(
  <div key={student._id} >
    <ul >
      <li>
        {student.name}
      </li>
    </ul>
    
  </div>
))}
</div> */}

  // const springQuestions = questions.filter(question=> question.term!== 'autumn')
  // const springPrime = springQuestions.filter(question=> question.area!== 'Specific Areas')
  // const comlang = springPrime.filter(q=>q.category)


  // console.log(springQuestions)
  // console.log(springPrime)



//   flatmap: combines all assessment texts into one array

// filter(boolean) removes undefined (if a question id wasnt found)

// new set: deduplicates texts







// 1. How flatMap Works (Basic Behavior)
// Input: An array (here, filteredStudents)

// Action:

// Runs a mapping function on each item

// Flattens the resulting arrays into one single array

// vs. map: Regular map would give nested arrays, flatMap gives a flat array