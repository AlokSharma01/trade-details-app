import './App.css';
import { Login } from './Components/Login/Login';
import { Nasdaq } from './Components/Main/Nasdaq';
import { SignUp } from './Components/Singup/SignUp';
import { Routes, Route,} from "react-router-dom";

import { Navigate } from 'react-router-dom';

function App() {

  const user = localStorage.getItem("token")
  return (
    <div >
      <Routes>
        {user && <Route path="/" element={<Nasdaq/>} />}
        <Route path="/" element={<Navigate replace to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
