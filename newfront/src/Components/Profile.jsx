import api from "./../Functions/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import svg from './../inDevelopment.svg'

function Profile() {
  const [login, setLogin] = useState([]);
  const [per, setPer] = useState([])
  const params = useParams();

  useEffect(() => {
    async function a() {
  await api.post("/getUserbyID", { id: params.id }).then((res) => {
      setLogin(res.data);
    });
    await api.post("/perguntas/getQuestionByUser", { user_id: params.id }).then(res => {
      setPer(res.data)
  })
    }
  a()
  }, [])
  return (
    <>
    <div className="container">
      <div className="container-pro">
        <h1>{login.name}</h1>
        <p style={{'color': "white"}}>Numero de perguntas feitas: {per.length}</p>
      </div>
      <div className="img-div">
        <img className="img-d" src={svg} alt="" />
        <h1 style={{'textAlign': "center"}}>Em breve mais novidades.</h1>
      </div>
      </div>
    </>
  );
}

export default Profile;
