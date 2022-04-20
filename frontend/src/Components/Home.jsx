import React from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";

function Home() {
  return (
    <>
      <nav></nav>
      <div className="container-p">
        <h2 className="per-title">Pergunta</h2>
        <button className="btn-res">Responder</button>
      </div>
      <div className="ask" title="Fazer uma pergunta">
        <BsFileEarmarkPlus className="icon-ask" />
      </div>
    </>
  );
}

export default Home;
