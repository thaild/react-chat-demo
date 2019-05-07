import React, {Component} from 'react';
import io from 'socket.io-client';
import './App.scss';
import Peoples from './components/Peoples';
import Chat from "./Chat";
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery/dist/jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

class App extends Component {
    constructor(props) {
        super(props);

        this.socket = io('localhost:8080');
    }

    render() {
        return (
            <div className="container clearfix">
                <Peoples socket={this.socket}/>
                <Chat socket={this.socket}/>
            </div>
        );
    }
}

export default App;
