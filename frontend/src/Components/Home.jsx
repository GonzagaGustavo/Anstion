import React, { useState } from "react";
import axios from 'axios'
import "./../App.css";

function Home() {
const [email, setEmail] = useState("")
const [senha, setSenha] = useState("")

function send() {
    let form = {
        email: email,
        password: senha
    }
    axios.post("/verifyLogin", form).then(res => {
        if(res.data === "nouser") {
            document.querySelector(".err").innerText = "Email ou Senha Incorretos!"
        } else {
            
        }
    })
}

  return (
    <div className="flex-home">
      <div className="img-container">
        <img src="estudando-home.jpg" className="home-img" alt="" />
      </div>
      <h1 className="h1-home">Duvida na hora da tarefa ou prova?</h1>
      <div className="form-home">
        <div className="flex-form">
          <h1 className="facaL">Faça o login</h1>
          <hr />
          <p className="err"></p>
          <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" className="input" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button className="btn-entrar" onClick={send}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
