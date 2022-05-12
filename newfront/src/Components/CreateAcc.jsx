import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import { Context } from "../Functions/Context";

function CreateAcc() {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const { logged } = useContext(Context)

function criar() {
    if(!name || !email || !password) {
        toast.error("Prencha todos os campos")
    } else {
        if(logged) {
            toast.error("Você já está logado!")
        } else {
          if(validator.isEmail(email)) {
            let info = {
                name: name,
                email: email,
                password: password
            }
            axios.post("/createLogin", info).then(res => {
                if(res.data === "Usuario Criado!") {
                    toast.success(res.data)
                    setTimeout(() => window.location.href = "/../login", 2000)
                } else {
                    toast.error(res.data)
                }
            })
        } else {
            toast.error("Insira um email válido!")
        }  
        }
        
    }
}

  return (
    <>
    <div className="container" style={{height: "75vh"}}>
      <h1 className="c-h1">
        Você está à poucos passos de fazer sua primeira pergunta!
      </h1>
      <div className="c-inputs">
        <h3>Crie sua conta</h3>
        <input type="text" placeholder="Digite seu nome:" className="A-input" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Digite seu email:" className="A-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Crie uma senha:" className="A-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-success" style={{margin: "2%"}} onClick={criar}>Criar</button>
      </div>
      </div>
    </>
  );
}

export default CreateAcc;
