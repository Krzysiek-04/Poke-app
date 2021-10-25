// Niestety nie udało mi sie wszystkiego zrobić mam problem z dodaniem pokemonów do Areny i coś na konieć namieszałem z Favourites ponieważ nie mogę dodawać pokemonów...

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const WrapContainer = styled.div`

display: flex:
flex-start: center;
  background-color: #6fa8dc;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  align-content: center;
  hight: 100%;
  margin-top: 10vw;
  margin-left: 40vw;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #6fa8dc;
  width: 20vw;
  height: 35vw;
  text-align: center;
`;
const Title = styled.h4`
  font-size: 15px;
  color: black;
`;
const IconFavourite = styled.div`
  color: ${({ pokemonFavourite }) => (pokemonFavourite ? "red" : "gray")};
  margin-bottom: 20px;
`;
const IconAddArena = styled.div`
  color: ${({ pokemonAddArena }) => (pokemonAddArena ? "red" : "gray")};
  margin-bottom: 20px;
  color: black;
`;

const PictureIcon = styled.div`
  display: flex;
  flex-direction: column;
`;
const Forms = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const Name = styled.div`
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
  font-weight: bolder;
  color: red;
  margin-bottom: 8px;
  text-transform: capitalize;
`;
const Abilities = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Image = styled.img`
  width: 5vw;
`;
const Info = styled.div`
  margin-top: 10px;
  font-family: serif;
  max-height: 90%;
  align-items: center;
`;
const Data = styled.h5`
  margin-top: 1px;
  font-size: 10px;
`;
const Details = ({ url_favourite, url_arena }) => {
  const history = useHistory();
  const [pokemon, setPokemon] = useState([]);
  const [pokemonFavourite, setPokemonFavourite] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [pokemonAddArena, setPokemonAddArena] = useState(null);
  const hasAbility = Array.isArray(pokemon?.abilities);
  const { id } = useParams();
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;
  console.log("id2", id);

  useEffect(() => {
    axios.get(`http://localhost:3000/favorites`).then((response) => {
      console.log("favourite", response.data);
      setFavourites(response.data);
      const isPokemonFavourite = response.data
        .map((item) => item.id)
        .includes(+id);
      console.log("pokemonFavourite", isPokemonFavourite);
      setPokemonFavourite(isPokemonFavourite);
    });
  }, []);

  useEffect(async () => {
    const response = await axios.get(
      url_favourite ? url_favourite : `${BASE_URL}/${id}`
    );
    setPokemon(response.data);
    console.log("POK", response.data);
  }, []);

  useEffect(() => {}, [pokemonFavourite]);

  const handleAddFavourite = () => {
    if (!pokemonFavourite) {
      axios.post(`http://localhost:3000/favorites`, {
        id: pokemon.id,
      });
      setPokemonFavourite(true);
    } else {
      axios
        .delete(`http://localhost:3000/favorites/${id}`)
        .then((response) => console.log(response.data));
      setPokemonFavourite(false);
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:3000/arena`).then((response) => {
      setPokemonAddArena(response.data.length >= 2 ? false : true);
      console.log("response.data", response.data);
    });
  }, []);

  useEffect(async () => {
    const response = await axios.get(
      url_arena ? url_arena : `${BASE_URL}/${id}`
    );
    setPokemon(response.data);
    console.log("POKEarena", response.data);
  }, []);
  console.log(pokemonAddArena);

  const handleAddArena = () => {
    if (pokemonAddArena === true) {
      axios
        .post(`http://localhost:3000/arena`, {
          id: pokemon.id,
        })
        .then(() => pokemonAddArena === false);
    }
  };
  const handleDeleteFromArena = () => {
    if (pokemonAddArena === false) {
      axios
        .delete(`http://localhost:3000/arena/${pokemon.id}`)
        .then((response) => console.log(response.data));
      console.log("pokemonaddarena", pokemonAddArena);
    }
  };

  return (
    <>
      {hasAbility && (
        <WrapContainer>
          <Wrapper data-name={pokemon.name}>
            <Image
              alt={pokemon.name}
              src={pokemon?.sprites?.other.dream_world.front_default}
            />
            <Info>
              <PictureIcon>
                <IconAddArena
                  pokemonAddArena={pokemonAddArena}
                  onClick={() => handleAddArena()}
                >
                  <CatchingPokemonIcon />{" "}
                </IconAddArena>
              </PictureIcon>
              <button
                pokemonAddArena={pokemonAddArena}
                onClick={() => handleDeleteFromArena()}
              >
                Delete
              </button>
              <div>
                <Name>{pokemon.name}</Name>
              </div>
              <PictureIcon>
                <IconFavourite
                  pokemonFavourite={pokemonFavourite}
                  onClick={() => handleAddFavourite()}
                >
                  <FavoriteIcon />
                </IconFavourite>
              </PictureIcon>
              <Abilities>
                <Forms>
                  <Title>Height</Title>
                  <Data>{pokemon.height}</Data>
                </Forms>
                <Forms>
                  <Title>Base experience</Title>
                  <Data>{pokemon.base_experience}</Data>
                </Forms>
              </Abilities>
              <Abilities>
                <Forms>
                  <Title>Weight</Title>
                  <Data>{pokemon.weight}</Data>
                </Forms>
                <Forms>
                  <Title>Ability</Title>
                  {pokemon?.abilities.map(({ ability: { name } }) => (
                    <Data>{name}</Data>
                  ))}
                </Forms>
              </Abilities>
              <BtnContainer>
                <button onClick={() => history.push(`/`)} variant="contained">
                  Home
                </button>
              </BtnContainer>
            </Info>
          </Wrapper>
        </WrapContainer>
      )}
    </>
  );
};
export default Details;
