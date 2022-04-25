import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { BsFileEarmarkPlus } from "react-icons/bs";

function Home() {
  const [perguntas, setPerguntas] = useState([]);
  const [logged, setLogged] = useState(false);
  const [userinfo, setUserinfo] = useState({});

  useEffect(() => {
    axios
      .get("/perguntas/getQuestions")
      .then((res) => {
        setPerguntas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //Autenticação de usuario
    if (Cookies.get("user") || Cookies.get("token")) {
      let id = Cookies.get("user");
      let token = Cookies.get("token");
      //Erro aqui! Se vira kkk
      let user = jwt.verify(token, process.env.JWT_SECRET);
      if (user.id === id) {
        let infos = {
          id: user.id,
          email: user.email,
        };
        axios.post("/getUser", infos).then((res) => {
          setUserinfo(res.data);
        });
        setLogged(true);
        console.log(userinfo);
      } else {
        setLogged(false);
      }
    } else {
      setLogged(false);
      console.log(logged);
    }
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
