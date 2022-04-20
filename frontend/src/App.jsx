import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Inicio" element={<Home />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
