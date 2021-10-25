import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Details from "../components/Details";

const PokemonContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #cccccc;
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100vw;
  margin: 30px;
  background-color: #6fa8dc;
`;

function Favourite() {
  const [pokemonFavouriteById, setPokemonFavouriteById] = useState([]);
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;

  const getFavourites = () => {
    axios.get(`http://localhost:3000/favorites`).then((response) => {
      setPokemonFavouriteById(response.data);
    });
  };
  useEffect(() => {
    getFavourites();
  }, []);
  console.log("favouritesById", pokemonFavouriteById);

  return (
    <PokemonContainer>
      <MainContainer>
        {pokemonFavouriteById?.map(({ id }) => (
          <Details url_favourite={`${BASE_URL}/${id}`}></Details>
        ))}
      </MainContainer>
    </PokemonContainer>
  );
}
export default Favourite;
