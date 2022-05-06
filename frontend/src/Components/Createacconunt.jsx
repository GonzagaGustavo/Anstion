import api from "./../api.js";
import React, { useState } from 'react'

function Createacconunt() {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

function create() {
    if(name === "") {
        document.querySelector(".pdoe").classList.add('err')
    } else {
        if(email === "") {
        document.querySelector(".pdoe").classList.add('err')
        } else {
            if(password === "") {
                document.querySelector(".pdoe").classList.add('err')
            } else {
                let info = {
                    name: name,
                    email: email,
                    password: password
                }
                api.post("/createLogin", info).then(res => {
                    alert(res.data)
                    window.location.href="/../login"
                })
            }
        }
    }
}

  return (
    <div>
        <p className='pdoe'></p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={create}>Criar</button>
    </div>
  )
}

export default Createacconunt