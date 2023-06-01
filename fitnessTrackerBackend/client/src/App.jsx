import {Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./components/Home";

function App() {

  return (
    <div>
      <h1>Fitness Tracker</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App