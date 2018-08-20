import React, { Component } from "react";
import "./App.css";
import { fonts } from "./fonts";
const figlet = require("./figlet");

const outputRender = output => {
  return output.join("\n");
};

class App extends Component {
  constructor() {
    super();
    this.state = { output: [] };
  }
  componentDidMount() {}

  outputCreate = text => {
    this.setState(
      {
        output: []
      },
      () => {
        let _this = this;
        let fontsBunch = fonts.sort(() => 0.5 - Math.random()).slice(0, 10);
        fontsBunch.forEach(font => {
          figlet(text, font, function(err, text) {
            if (err) {
              console.error("something went wrong...", err);
              return;
            }
            _this.setState({ output: [..._this.state.output, text] });
          });
        });
      }
    );
  };

  inputHandler = e => {
    this.setState({
      text: e.target.value
    });
    this.outputCreate(e.target.value);
  };

  render() {
    return (
      <div>
        <input onChange={this.inputHandler} />
        <pre editable="true">{outputRender(this.state.output)}</pre>
      </div>
    );
  }
}

export default App;
