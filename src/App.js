import React, { Component } from "react";
import "./App.css";
import { fonts } from "./fonts";
const figlet = require("./figlet"),
  _ = require("lodash");

const outputRender = output => {
  //   return output.join("\n");
  return output.map((o, i) => (
    <div editable="true" key={i}>
      {o}
    </div>
  ));
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      output: [],
      loading: true
    };
  }

  componentDidMount() {
    this.outputCreate("Type..");
  }

  outputCreate = text => {
    this.setState(
      {
        output: [],
        loading: true
      },
      () => {
        let _this = this,
          fontsBunch = _.cloneDeep(fonts);
        fontsBunch = fontsBunch.sort(() => 0.5 - Math.random()).slice(0, 20);
        fontsBunch.forEach(font => {
          // This should all run through promises, with loading: false at the end, but meh
          figlet(text, font, function(err, text) {
            if (err) {
              console.error(err);
              return;
            }
            // text = " -dwa-- " + font + "\n" + text;
            _this.setState({
              output: [..._this.state.output, text],
              loading: false
            });
          });
        });
      }
    );
  };

  inputHandler = e => {
    let text = e.target.value;
    clearTimeout(this.inputHandlerTimeout);
    this.inputHandlerTimeout = setTimeout(() => {
      console.log("calc..");
      this.setState({
        text: text
      });
      this.outputCreate(text);
    }, 150);
  };

  render() {
    return (
      <main>
        <input onChange={this.inputHandler} placeholder="Type.." />
        {this.state.loading && (
          <div className="output">
            <div>...</div>
          </div>
        )}
        <div className="output">{outputRender(this.state.output)}</div>
      </main>
    );
  }
}

export default App;
