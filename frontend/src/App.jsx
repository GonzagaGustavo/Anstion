import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import "./App.css";
import AskQuestion from "./Components/AskQuestion";
import Createacconunt from "./Components/Createacconunt";
import Err from "./Components/Err";
import Home from "./Components/Home";
import Login from "./Components/Login";
import PerguntaScreen from "./Components/PerguntaScreen";
import Profile from "./Components/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<Err />}></Route>
          <Route path="/pergunta/:id" element={<PerguntaScreen />}></Route>
          <Route path="/AskAQuestion" element={<AskQuestion />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/createAccount" element={<Createacconunt />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
