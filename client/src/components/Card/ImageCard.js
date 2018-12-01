import React, { Component } from "react";
import { Paper, TextField, InputLabel, FormControl } from "@material-ui/core";

class ImageCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      date: "",
      notes: "",
      text: ""
    };
  }
  render() {
    return (
      <Paper>
        <img src={this.state.image} />
        <div className="form-container">
          <TextField variant="outlined" label="Date" />
          <TextField
            label="Notes"
            variant="outlined"
            aria-invalid="false"
            id="outlined-multiline-static"
            multiline={true}
            rows="4"
          />
        </div>
      </Paper>
    );
  }
}

export default ImageCard;
