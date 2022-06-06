import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFileEarmarkPlus } from 'react-icons/bs'
// import api from './../Functions/api.js'

function Home() {
const [perguntas, setPerguntas] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
 async function a() {
    await axios.get('https://anstion.herokuapp.com/perguntas/getQuestions').then(res => {
        setPerguntas(res.data)
        setLoading(false)
    })
  }
    a()
}, [])

  return (
    <>
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : (
        <>
        {perguntas.map((pergunta) => (
          <div className="container-p" key={pergunta.id}>
            <a href={`/pergunta/${pergunta.id}`}>
              <h2 className="per-title">
                {`${pergunta.pergunta}`.substring(0, 33)}
              </h2>
            </a>
            <button
              className="btn-res"
              onClick={() =>
                (window.location.href = `/pergunta/${pergunta.id}`)
              }
            >
              Responder
            </button>
          </div>
        ))}
        </>
      )}
        
      </div>
      <a href="/askAQuestion" className="ask" title="Fazer uma pergunta">
        <BsFileEarmarkPlus className="icon-ask" />
      </a>
    </>
  )
}

export default Home