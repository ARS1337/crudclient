import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import TodoComponent from "./components/TodoComponent";

function App() {
  const [user,setuser] = useState('')
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
       <Routes>
        <Route path="/" element={<Login user={user} setuser={setuser}/>} />
        <Route path="TodoComponent" element={<TodoComponent user={user} setuser={setuser}/>} />
      </Routes>
    </div>
  );
}

export default App;