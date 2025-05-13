import {useNavigate} from 'react-router-dom'
import {House} from 'lucide-react'

const HomeButton = () => {
  const navigate = useNavigate()

  function returnHome(){
    navigate('/')
  }
  return (
    <button onClick={returnHome} >
      <House size={20} className="xl:size-8 cursor-pointer"/>
    </button>
  )
}

export default HomeButton
