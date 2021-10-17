import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material/core";
import { ThemeConsumer } from "styled-components";

const useStyles = makeStyles((them) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },

  button: {
    flexGrowe: 3,
    display: "flex",
    flexBasis: "20vw",
    alignItems: "center",
    marginRight: theme.spacing(4),
    fontFamily: "cursive",
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
  },

  title: {
    flexGrow: 3,
    display: "flex",
    flexBasis: "20vw",
    fontFamily: "cursive",
    fontWeight: "bolder",
    fontSize: "25px",
    justifyContent: "flex start",
    alignItems: "center",
    marginLeft: theme.spacing(2),
  },
}));

function Navigation({...props})
