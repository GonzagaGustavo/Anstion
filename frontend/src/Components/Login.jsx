import React, { useState } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'
import "./../App.css";

function Login() {
const [email, setEmail] = useState("")
const [senha, setSenha] = useState("")

document.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') {
    send()
  }
})

function send() {
  if(email === "" || senha === "") {
    document.querySelector(".err").innerText = "Email ou Senha Incorretos!"
  } else {
    let form = {
        email: email,
        password: senha
    }
    axios.post("/verifyLogin", form).then(res => {
        if(res.data === "nouser") {
            document.querySelector(".err").innerText = "Email ou Senha Incorretos!"
        } else {
            Cookies.set('user_id', res.data.id, {expires: 60 * 60 * 24 * 365})
            Cookies.set('token', res.data.token, {expires: 60 * 60 * 24 * 365})
            window.location.href="/"
        }
    })
  }
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
          <button className="btn-criarC" onClick={send}>Criar Conta</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
