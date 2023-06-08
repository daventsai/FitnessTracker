import {Routes, Route} from "react-router-dom"
import './App.css'

import Home from "./components/Home";
import AuthForm from './components/AuthForm';

function App() {

  return (
    <div>
      <h1>Fitness Tracker</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<AuthForm/>}/>
        <Route path="/login" element={<AuthForm/>}/>
      </Routes>
    </div>
  )
}

export default App
