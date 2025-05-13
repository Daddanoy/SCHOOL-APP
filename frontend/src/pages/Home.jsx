import  {useStore} from "../store/store.js";
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'



function Home() {
  const {fetchQuestions, setTerm,resetSelections} = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Reset all selections when landing on the home page
    resetSelections(); 
    
    // Then fetch all the questions from the db
    fetchQuestions();
  }, [fetchQuestions, resetSelections])
  

  const handleTermSelect = (term)=>{
    setTerm(term);
    navigate('/area')
  }

  const studentTable =()=>{
    navigate('/students-table')
  }

  return (
    <div className="flex flex-col space-y-8  items-center min-h-screen ">
      <h1 className=" p-8 text-3xl">ProGrade</h1>
      {['autumn', 'spring', 'summer'].map(term=>(
        <button
        key={term}
        className="shadow-xl  rounded-lg hover:bg-base-300  px-6 py-12 text-xl capitalize max-w-4xl mx-auto w-40 sm:w-140 cursor-pointer"
        onClick={()=> handleTermSelect(term)}
        >
          {term} Term

        </button>
        
      ))}
      <button onClick={studentTable} className=" bg-base-200 rounded-lg hover:bg-base-500  px-6 py-12 text-xl capitalize max-w-4xl mx-auto w-40 sm:w-140">Student-Table</button>
    </div>
  )
}

export default Home
