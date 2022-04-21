import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PerguntaScreen() {
const [respostas , setRespostas] = useState([])
const params = useParams()

useEffect(() => {
    axios.post("/respostas/getRespostas", { id: params.id }).then(res => {
        setRespostas(res.data)
    }).catch(err => {
        console.log(err)
    })
}, [])
  return (
    <div>
        {respostas.map((resposta) => (
            <div>
                <p>{resposta.resposta}</p>
            </div>
        ))}
    </div>
  )
}

export default PerguntaScreen