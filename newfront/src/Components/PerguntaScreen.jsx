import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from 'react-icons/md'
import triste from './../triste.svg'
import { RiEmotionHappyFill } from 'react-icons/ri'
import { toast } from "react-toastify";
import axios from 'axios';

function PerguntaScreen() {
  const [loading, setLoading] = useState(true)
    const [pergunta, setPergunta] = useState([])
    const [respostas, setRespostas] = useState([])
    const [text, setText] = useState("")
    const params = useParams();
    const history = useNavigate();

useEffect(() => {
  async function a() {
  //Pegando Pergunta
    await axios.post("https://anstion.herokuapp.com/perguntas/getOneQuestion", { id: params.id }).then((res) => {
        setPergunta(res.data[0]);
        setLoading(false)
      });
      //Pegando respostas
      await axios
    .post("https://anstion.herokuapp.com/respostas/getRespostas", { id: params.id })
    .then((res) => {
      setRespostas(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
   a() 
}, [params.id])
document.title = `${pergunta.pergunta}`.substring(0, 35) + " - AnsTion"

    async function sendRes() {
        if (text === "") {
            toast.error("Escreva alguma resposta!")
        } else {
            let info = {
              pergunta_id: params.id,
              resposta: text,
            };
            await axios.post("https://anstion.herokuapp.com/respostas/saveRes", info).then((res) => {
              toast.success(res.data);
              setText("")
            });
        }
      }
  return (
    <>
    <MdKeyboardBackspace className="back" onClick={() => history(-1)} />
      <div className="center">
        <div className="t-container">
          {loading ? (
            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          ) : (
            <h1>{pergunta.pergunta}</h1>
          )}
          
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
          <h3>Ainda não há resposta para esta pergunta!</h3>
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
  )
}

export default PerguntaScreen