import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

function AskQuestion() {
  const [text, setText] = useState("");
  const [logged, setLogged] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    if (Cookies.get("user_id") && Cookies.get("token")) {
      let id = Cookies.get("user_id");
        let token = Cookies.get("token");
        //Decodificando o token e buscando as informações no DB
        let user = jwt.decode(token, process.env.JWT_SECRET);
        if (user.id == id) {
          setLogged(true)
        } else {
          setLogged(false)
        }
    } else {
      setLogged(false)
    }
  });

  function fazerP() {
    if(logged) {
      if(text === "") {
        alert("Escreva uma pergunta!")
      } else {
        let token = Cookies.get("token");
        let user = jwt.decode(token, process.env.JWT_SECRET);
        let info = {
          user_id: user.id,
          pergunta: text
        }
        axios.post("/perguntas/create", info).then(res => {
          alert(res.data)
        })
      }
    } else {
      alert("Faça o login para fazer uma pergunta!")
    }
  }
  return (
    <>
      <MdKeyboardBackspace className="back" onClick={() => history(-1)} />
      <span className="spe">
        <img
          className="pensando"
          src="https://acegif.com/wp-content/gif/thinking-emoji-30.gif"
          alt=""
        />
      </span>
      <div className="dPerguntar">
        <textarea
          id="text-per"
          cols="30"
          rows="10"
          placeholder="Faça sua pergunta:"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="btn-sendPer" onClick={fazerP}>
          Postar pergunta
        </button>
      </div>
    </>
  );
}

export default AskQuestion;
