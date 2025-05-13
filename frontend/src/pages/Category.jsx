import  {useStore} from "../store/store.js";
import { useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom'




function Category() {

  const {filteredQuestions, setCategory, selectedArea, setTerm,selectedTerm,setArea } = useStore()
  const navigate = useNavigate()
  const [categories,setCategories] = useState([])

  

useEffect(()=>{

  if (!selectedTerm || !selectedArea) {
    navigate('/');
    return;
  }


  const uniqueCategories = [...new Set(
    filteredQuestions.map(question=> question.category)
  )];//this equals maths and scienece for example
  setCategories(uniqueCategories)
  console.log(uniqueCategories)
  
},[filteredQuestions,selectedTerm,selectedArea,navigate,setArea])

console.log(selectedArea)// this should equal math and science
console.log(filteredQuestions)

const handleBackButton=()=>{
setTerm(selectedTerm)
navigate('/area')
}

const handleCategorySelect = (category)=>{
  setCategory(category)
  navigate('/students')
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
  <div className="w-full max-w-md px-4">
    <h1 className="text-3xl font-bold text-center p-8">
      Select Category for {selectedArea}
    </h1>
    
    <div className="flex flex-col items-center space-y-6 w-full">
      {categories.map(category => (
        <button
          key={category || 'uncategorized'}
          className="cursor-pointer shadow-xl w-full max-w-xs  hover:bg-base-200  text-xl rounded-lg p-4 py-12 transition-colors"
          onClick={() => handleCategorySelect(category)}
        >
          {category || 'Uncategorized'}
        </button>
      ))}
    </div>

    <div className="flex justify-center mt-8">
      <button 
        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        onClick={handleBackButton}
      >
        Back to Areas
      </button>
    </div>
  </div>
</div>
  )
}

export default Category
