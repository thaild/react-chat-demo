import React, { Component } from 'react';
import './App.scss';
import People from './People';
import Chat from "./Chat";
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery/dist/jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

class App extends Component {
  render() {
    return (
        <div className="container clearfix">
          <People />
          <Chat />
        </div>
    );
  }
}

export default App;
