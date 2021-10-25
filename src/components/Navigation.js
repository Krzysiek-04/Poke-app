import React from "react";
import { makeStyles, AppBar, Toolbar, Button, styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
// import Pokemon from "../Image/Pokemon";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 5,
    flexDirection: "row",
    display: "flex",
    flexBasis: "vw",
    float: "left",
    justifyContent: "flex start",
    alignItems: "start",
  },
  button: {
    flexGrow: 5,
    display: "flex",
    float: "right",
    flexBasis: "20vw",
    alignItems: "center",
    color: "white",
    fontSize: "20px",
  },
}));

function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <CatchingPokemonIcon className={classes.title} />

          <Link to="/Favourite">
            <Button variant="contained">Favorite</Button>
          </Link>
          <Link to="/Arena">
            <Button variant="contained">Arena</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navigation;
