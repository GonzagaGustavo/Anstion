import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import "./App.css";
import Err from "./Components/Err";
import Home from "./Components/Home";
import Login from "./Components/Login";
import PerguntaScreen from "./Components/PerguntaScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Inicio" element={<Home />}></Route>
          <Route path="/*" element={<Err />}></Route>
          <Route path="/pergunta/:id" element={<PerguntaScreen />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
