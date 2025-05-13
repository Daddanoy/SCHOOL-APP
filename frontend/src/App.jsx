import {Routes, Route,} from 'react-router-dom'


//Import pages
import Area from './pages/Area'
import Assesments from './pages/Assesments'
import Home from './pages/Home'
import Students from './pages/Students'
import StudentsTable from './pages/StudentsTable'
import HomeButton from './components/HomeButton'


import './App.css'
import Category from './pages/Category'




function App() {
 
  return (
    <>
    <div className='ml-10 py-2'>
    <HomeButton/>
    </div>
    
    
    
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/assessments" element={<Assesments/>}></Route>
      <Route path="/area" element={<Area/>}></Route>
      <Route path="/students" element={<Students/>}></Route>
      <Route path="/category" element={<Category/>}></Route>
      <Route path="/students-table" element={<StudentsTable/>}></Route>

    </Routes>
    </>
  )
}

export default App
