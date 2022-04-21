import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";

function Home() {
  const [perguntas, setPerguntas] = useState([]);

  useEffect(() => {
    axios
      .get("/perguntas/getQuestions")
      .then((res) => {
        setPerguntas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <nav></nav>
      <div className="container">
        {perguntas.map((pergunta) => (
            <div className="container-p" key={pergunta.id}>
            <a href={`/pergunta/${pergunta.id}`}>
              <h2 className="per-title">
                {`${pergunta.pergunta}`.substring(0, 33)}
              </h2>
              </a>
              <button className="btn-res">Responder</button>
            </div>
          
        ))}
      </div>
      <div className="ask" title="Fazer uma pergunta">
        <BsFileEarmarkPlus className="icon-ask" />
      </div>
    </>
  );
}

export default Home;
