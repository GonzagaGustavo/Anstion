import api from "./../api.js";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiEmotionHappyFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import triste from './../triste.svg'
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken' 

function PerguntaScreen() {
  const [logged, setLogged] = useState(false)
  const [pergunta, setPergunta] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [text, setText] = useState("");
  const params = useParams();
  const history = useNavigate();

  useEffect(() => {
    // Verificando se está logado
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
    //Pegando pergunta
    api.post("/perguntas/getOneQuestion", { id: params.id }).then((res) => {
      setPergunta(res.data[0]);
    });
    //Pegando respostas
    api
      .post("/respostas/getRespostas", { id: params.id })
      .then((res) => {
        setRespostas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
document.title = `${pergunta.pergunta}`.substring(0, 35) + " - AnsTion" 

  function sendRes() {
    if (text === "") {
      alert("Escreva alguma resposta")
    } else {
      if(logged) {
        let info = {
          pergunta_id: params.id,
          resposta: text,
        };
        api.post("/respostas/saveRes", info).then((res) => {
          alert(res.data);
          setText("")
        });
      } else {
        alert("Faça o login para responder!")
      }
    }
  }
  return (
    <>
      <MdKeyboardBackspace className="back" onClick={() => history(-1)} />
      <div className="center">
        <div className="t-container">
          <h1>{pergunta.pergunta}</h1>
        </div>
        <textarea
          id="text-area-r"
          cols="30"
          rows="10"
          placeholder="Escrever uma resposta:"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={sendRes} className="btn-sendRes">
          Responder
        </button>
      </div>
      {respostas.length === 0 ? (
        <div className="no-res">
          <img src={triste} alt="" className="triste-svg" />
          <h1>Ainda não há resposta para esta pergunta!</h1>
          <h1></h1>
        </div>
      ): (
        <></>
      )}
      {respostas.map((resposta) => (
        <div className="resposta-screen">
          <p>{resposta.resposta}</p>
          <div className="num-obri">
          <RiEmotionHappyFill className="thank" />
          </div>
        </div>
      ))}
    </>
  );
}

export default PerguntaScreen;
