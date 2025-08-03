import React, {useState, useEffect}from "react";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

/*export default function Repositorio() {
  const { repositorio } = useParams();

  return (
    <h1 style={{ color: '#FFF' }}>
      Repositorio Page: {decodeURIComponent(repositorio)}
    </h1>
  );
}*/

export default function Repositorio() {
  const { repositorio } = useParams();
  useEffect(()=>{
    async function load() {
      const nomeRepo = decodeURIComponent(repositorio);
      
    }
  }
  )

  return (
    <Container>

      
    </Container>
  );
}