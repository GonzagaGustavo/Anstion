import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { Context } from "../Functions/Context.js";
import axios from "axios";
import { toast } from "react-toastify";

function AskQuestion() {
  const { logged, login } = useContext(Context)
  const [text, setText] = useState("");
  const history = useNavigate();

  function fazerP() {
    if(logged) {
      if(text === "") {
        toast.error("Escreva uma pergunta!")
      } else {
        let info = {
          pergunta: text,
          user_id: login.id
        }
        axios.post("/perguntas/create", info).then(res => {
          toast.success(res.data)
        })
      }
    } else {
      toast.error("Faça o login para fazer a pergunta!")
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
