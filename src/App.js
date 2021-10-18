import React, { useState } from "react";
import Switch from "react-switch";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Arena from "./pages/Arena";
import ArenaPokemons from "./components/ArenaPokemons";
import PokemonList from "./pages/PokemonList";
import PokemonCrads from "./components/PokemonCards";
import Favorite from "./pages/Favorite";

function App() {
  const [pokem, setPokem] = useState(null);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(2);

  console.log("poki", pokem);

  // const handleClick = (pokemonName) => {
  //   history.push(`/${pokemonName}`)
  // }
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Switch>
          <Route path="/" exact>
            <div>
              <Search handleClick={(value) => setSearch(value)} />
              <PokemonList setPokem={setPokem} />
            </div>
          </Route>
          <Route path="/Ulubione">
            <Favorite />
          </Route>

          <Route path="/Arena">
            <Arena />
          </Route>

          <Route path="/:id">
            <PokemonCrads />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
