
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Message from './Pages/Message'
import Error from './Pages/Error'
import ResetPass from './Pages/ResetPass'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/message' element={<Message/>}></Route>
        <Route path='*' element={<Error/>}></Route>
        <Route path='/resetpassword' element={<ResetPass/>}></Route>
      </Routes>
    </>
  ) 
}

export default App
