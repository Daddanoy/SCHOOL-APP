import  {useStore} from "../store/store.js";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'


function Area() {

  const {filteredQuestions,selectedTerm,setArea,resetSelections} = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedTerm) {
      console.error("No term selected. Redirecting to Home...");
      navigate("/");
      return
    }

    
    console.log(filteredQuestions)


  }, [selectedTerm, navigate,filteredQuestions]);

  const handleBackButton=()=>{
    resetSelections();
    navigate('/')
  }

  const handleAreaSelect = (area)=>{
    setArea(area)
    navigate('/category')
    
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"> {/* Added flex centering here */}
    <div className="w-full max-w-md px-4"> {/* Constrains width and adds padding */}
      <h1 className="text-3xl font-bold text-center p-8 capitalize">{selectedTerm}</h1>
      
      <div className="flex flex-col items-center space-y-6 w-full"> {/* Full width column */}
        {['Prime Areas', 'Specific Areas'].map(area => (
          <button 
            key={area}
            className="cursor-pointer shadow-xl w-full max-w-xs  rounded-lg p-4 py-12  text-xl hover:bg-base-300 transition-colors" 
            onClick={() => handleAreaSelect(area)}
          >
            {area}
          </button>
        ))}
      </div>
  
      <div className="flex justify-center mt-8"> {/* Centered container for back button */}
        <button 
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          onClick={handleBackButton}
        >
          Back to Terms
        </button>
      </div>
    </div>
  </div>
    
    
  )
}

export default Area
