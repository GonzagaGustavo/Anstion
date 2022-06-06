// import api from "./Functions/api";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Err from "./Components/Err";
import Home from "./Components/Home";
import PerguntaScreen from "./Components/PerguntaScreen";
import { BiUserCircle } from "react-icons/bi";
import Login from "./Components/Login";
import AskQuestion from "./Components/AskQuestion";
import { Context } from "./Functions/Context";
import Profile from "./Components/Profile";
import CreateAcc from "./Components/CreateAcc";
import axios from "axios";

function App() {
  //Constante usada na funçao userName
  const [a, setA] = useState("a")
  const { logged, login, setLogged, setLogin } = useContext(Context)

  useEffect(() => {
    async function a() {
      //Autenticação de usuario
    if (Cookies.get("user_id") && Cookies.get("token")) {
      let id = Cookies.get("user_id");
      let token = Cookies.get("token");
      //Decodificando o token e buscando as informações no DB
      let infos = {
        id: id,
        token: token,
      };
      await axios.post("https://anstion.herokuapp.com/getUser", infos).then((res) => {
        console.log(res);
        if (res.data === false) {
          setLogged(false);
          console.log("oi");
        } else {
          setLogged(true);
          setLogin(res.data);
        }
      });
    } else {
      setLogged(false);
    }
    }
    a()
  }, [setLogged, setLogin]);

  function signout() {
    Cookies.remove("user_id");
    Cookies.remove("token");
    window.location.reload();
  }
  function userName() {
    if (a === "a") {
      document.querySelector(".user-name").style.position = "relative";
      setA("b")
    } else {
      
      setTimeout(() => document.querySelector(".user-name").style.position = "absolute", 350)
      setA("a")
    }
  }

  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{
            backgroundColor: "#FFF5AF",
            borderBottom: "1px solid black",
          }}
        >
          <div className="container-fluid">
            <a className="navbar-brand logo" href="/">
              Anstion
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={userName}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li class="nav-item">
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
                </li> */}
              </ul>
              <div className="d-flex">
                {logged ? (
                  <div className="user-name">
                    <p className="signin-1">
                      <BiUserCircle />
                      {login.name}
                    </p>
                    <ul className="dropdown-content">
                      <a href={`/profile/${login.id}`} className="link-pro">
                        Perfil
                      </a>
                      <p onClick={signout} className="pointer">
                        Sair
                      </p>
                    </ul>
                  </div>
                ) : (
                  <a href="/login">
                    <button
                      className="btn btn-outline-success"
                      style={{
                        backgroundColor: "rgb(255, 255, 0)",
                        border: "2px solid rgb(255, 166, 0)",
                        color: "black",
                      }}
                    >
                      Entrar
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pergunta/:id" element={<PerguntaScreen />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/AskAQuestion" element={<AskQuestion />}></Route>
          <Route path="/createAccount" element={<CreateAcc />}></Route>
          <Route path="/*" element={<Err />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
