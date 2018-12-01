// template card for image, audio, notes, preview, display

import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  Content,
  CardHeader,
  CardMedia,
  Collapse,
  Paper
} from "@material-ui/core";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      date: '',
      notes: '',


  }
}
