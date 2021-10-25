import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import PokemonCard from "../components/PokemonCard";

const Container = styled.div`
  width: 100vw;
  background-color: #6fa8dc;
`;
const ContainerSearch = styled.div`
  display: flex;
  justify-content: center;
  padding: 5vw;
  padding-bottom: 2vw;
  margin-bottom: 3px;
  background-color: #6fa8dc;
`;
const PageButton = styled.button`
  margin: 40px 40px 0px 40px;
  display: inline-block;
  bodrer: 1px solid;
  height: 30px;
  width: 100px;
  background-color: #4040a1;
  text-align: center;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  // transition: 0.5s;
`;
const ContainerButton = styled.div`
  display: flex;
  margin-top: 0%;
  margin-bottom: 5%;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-between;
  margin: 20px 30px 30px 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 3px 5px rgba(0, 0, 0, 0.6);
    text-decoration: none;
    border-radius: 5px;
  }
`;
const NEXT = "Next";
const PREV = "Previus";

function PokemonList() {
  const [pokemon, setPokemon] = useState();
  const [limitValue, setLimitValue] = useState(15);
  const [pageValue, setPageValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;

  useEffect(() => {
    axios
      .get(`${BASE_URL}?limit=${limitValue}&offset=${pageValue}`)
      .then((response) => {
        setPokemon(response.data);
        console.log("dane", response.data);
      });
  }, [pageValue, limitValue]);
  console.log();

  const prevPage = () => {
    if (pageValue === 0) {
      return;
    }
    setPageValue(pageValue - 15);
    setLimitValue(15);
  };
  const nextPage = () => {
    if (pageValue === 150) {
      return;
    } else if (pageValue === 135) {
      setLimitValue(1);
    }
    setPageValue(pageValue + 15);
  };
  return (
    <Container>
      <ContainerSearch>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: 250,
          }}
        >
          <IconButton>
            <MenuIcon />
          </IconButton>
          <InputBase
            placeholder="Search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </ContainerSearch>

      <ContainerButton>
        <PageButton onClick={prevPage}>{PREV}</PageButton>
        <PageButton onClick={nextPage}>{NEXT}</PageButton>
      </ContainerButton>
      <MainContainer>
        {pokemon?.results
          ?.filter((pokemon) => {
            if (searchValue === "") {
              return pokemon;
            } else if (
              pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
            ) {
              return pokemon;
            }
          })
          .map(({ url }, index) => (
            <Content>
              <PokemonCard url={url} key={index} />
            </Content>
          ))}
      </MainContainer>
    </Container>
  );
}
export default PokemonList;
