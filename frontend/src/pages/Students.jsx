import {useEffect,useState} from 'react'
import {useStore} from "../store/store.js";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../lib/axios.js";


function Students() {
  const {selectedTerm,selectedArea,setStudent, setCategory, selectedCategory,setTerm,setArea} = useStore()
  const [students,setStudents] = useState([])
  const [loading,setLoading]= useState()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!selectedTerm || !selectedArea || !selectedCategory){
      navigate('/')
    }

  },[selectedArea,selectedTerm,navigate,selectedCategory])


  useEffect(()=>{
    setLoading(true)
    const fetchStudents = async ()=>{
      try {
        const res = await axiosInstance.get("/students")
        setStudents(res.data)
        console.log(setStudents)
      } catch (error) {
        console.error("Error fetching students:", error)

      }finally{
        setLoading(false)
      }
    }
    fetchStudents()
  
  },[])

  const handleBack = () => {
    // Reset only the student selection, keep term, area, and category
    
    setTerm(selectedTerm)
    setArea(selectedArea)

    navigate('/category')
  }

  const handleStudentSelect = async (studentId)=>{
    await setStudent(studentId)
    navigate('/assessments')
  }


  if (loading) return <div className="text-center p-12">Loading students...</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Add back button */}
      <button 
        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mt-6 mb-8"
        onClick={handleBack}
      >
        Back to Categories
      </button>
      <h1 className="text-3xl font-bold mb-2">Select Student</h1>
      <p className=" mb-8">
        Term: {selectedTerm.charAt(0).toUpperCase() + selectedTerm.slice(1)} | 
        Area: {selectedArea} | 
        Category: {selectedCategory}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students?.map(student => (
          <div 
            key={student._id}
            className=" shadow-md rounded-lg p-4 cursor-pointer hover:bg-base-200"
            onClick={() => handleStudentSelect(student._id)}
          >
            <h3 className="font-semibold text-lg">{student.name}</h3>
            {/* Additional student info could go here */}
          </div>
        ))}
      </div>
      
      
    </div>
  )
}

export default Students
