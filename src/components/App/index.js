import React, { Component } from 'react';
import './index.css';

class App extends Component {
  render() {
    var response = this.doTheGet();

    return (
      <div>{response}</div>
    );
  }

  doTheGet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:3000/articles/", true);
    xmlHttp.send();
  }
}

export default App;