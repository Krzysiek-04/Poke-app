import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import PokemonList from "./pages/PokemonList";
import Arena from "./pages/Arena";
import Favourite from "./pages/Favourite";
import Details from "./components/Details";

function App() {
  const [pokem, setPokem] = useState(null);
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon`;
  console.log("pok", pokem);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <div>
              <PokemonList setPokem={setPokem} />
            </div>
          </Route>
          <Route path="/Favourite">
            <Favourite />
          </Route>

          <Route path="/Arena">
            <Arena />
          </Route>

          <Route path="/:id">
            <Details />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
