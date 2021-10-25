import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Details from "../components/Details";

const ArenaContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vw;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #6fa8dc;
`;
const Fight = styled.button`
  margin-top: 300px;
  width: 100px;
  height: 100px;
  background-color: red;
  border: 1px solid;
  font-weight: bolder;
  font-size: 20px;
  cursor: pointer;
`;
const FirstPosition = styled.div`
  margin-top: 100px;
  width: 30vw;
  height: 40vw;
  border: 1px solid;
  background-color: #cccccc;
`;
const SecondPosition = styled.div`
  margin-top: 100px;
  width: 30vw;
  height: 40vw;
  border: 1px solid;
  background-color: #cccccc;
`;
const CardLeft = styled.div`
  display: flex;
  justify-content: space-around;
  width: auto;
  height: auto;
`;
const CardRight = styled.div`
  display: flex;
  justify-content: space-around;
  width: auto;
  height: auto;
`;

const Arena = () => {
  const [pokemonAddArenaById, setPokemonAddArenaById] = useState([]);
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;

  const getArena = () => {
    axios.get(`http://localhost:3000/arena`).then((response) => {
      setPokemonAddArenaById(response.data);
    });
  };
  useEffect(() => {
    getArena();
  }, []);
  console.log("arenaById", pokemonAddArenaById);

  return (
    <ArenaContainer>
      <FirstPosition>
        <CardLeft>
          {pokemonAddArenaById?.map(({ id }) => (
            <Details URL_ARENA={`${BASE_URL}/${id}`}></Details>
          ))}
        </CardLeft>
      </FirstPosition>
      <Fight variant="contained">FIGHT</Fight>
      <SecondPosition>
        <CardRight>
          {pokemonAddArenaById?.map(({ id }) => (
            <Details url_arena={`${BASE_URL}/${id}`}></Details>
          ))}
        </CardRight>
      </SecondPosition>
    </ArenaContainer>
  );
};
export default Arena;
