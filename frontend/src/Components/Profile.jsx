import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const [login, setLogin] = useState([]);
  const [per, setPer] = useState([])
  const params = useParams();

  useEffect(() => {
    axios.post("/getUserbyID", { id: params.id }).then((res) => {
      setLogin(res.data);
    });
    axios.post("/perguntas/getQuestionByUser", { user_id: params.id }).then(res => {
      setPer(res.data)
  })
  
  }, [])
  console.log(per)
  return (
    <>
      <div>
        <h1>{login.name}</h1>
        <p>Numero de perguntas feitas: {per.length}</p>
      </div>
    </>
  );
}

export default Profile;
