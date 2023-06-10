import {Routes, Route} from "react-router-dom"
import './App.css'

import Home from "./components/Home";
import AuthForm from './components/AuthForm';
import PublicRoutines from './components/PublicRoutines'
import MyRoutines from "./components/MyRoutines";

function App() {

  return (
    <div>
      <h1>Fitness Tracker</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<AuthForm/>}/>
        <Route path="/login" element={<AuthForm/>}/>
        <Route path="/routines/public" element={<PublicRoutines/>}/>
        <Route path="/routines/" element={<MyRoutines/>}/>
      </Routes>
    </div>
  )
}

export default App
