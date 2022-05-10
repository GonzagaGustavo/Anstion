import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Err from "./Components/Err";
import Home from "./Components/Home";
import PerguntaScreen from "./Components/PerguntaScreen";


function App() {
  return (
  <BrowserRouter>
  <ToastContainer autoClose={3000} />
      <header>
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#FFF5AF", borderBottom: "1px solid black"}}>
          <div className="container-fluid">
            <a className="navbar-brand logo" href="#">
              Anstion
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled">Disabled</a>
                </li>
              </ul>
              <form class="d-flex">
                <button className="btn btn-outline-success" style={{backgroundColor: "rgb(255, 255, 0)", border: "2px solid rgb(255, 166, 0)", color: "black"}} type="submit">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pergunta/:id" element={<PerguntaScreen />}></Route>
        <Route path="/*" element={<Err />}></Route>
        </Routes>
      </main>
      </BrowserRouter>
  );
}

export default App;
