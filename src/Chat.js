import React, { Component } from 'react';
import axios from 'axios';
import './Chat.scss';
import MessageList from "./components/MessageList";
import UserInput from "./components/UserInput";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            client_id: '',
            selectedFiles: null
        };

        this.socket = this.props.socket;
        this.socket.on('RECEIVE_MESSAGE', (message) => this._receivedMessage(message) );
    }

    _receivedMessage(message) {
        this.setState({
            messageList: [...this.state.messageList, message]
        });

        // console.log(this.state.messageList);
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.socket.emit('SEND_MESSAGE', {
                author: this.socket.id,
                type: 'text',
                data: { text }
            })
        }
        if (this.state.selectedFiles){
            const data = new FormData();
            for(let x = 0; x < this.state.selectedFiles.length; x++) {
                data.append('file', this.state.selectedFiles[x])
            }

            axios.post("http://localhost:8080/upload", data, {})
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.socket.emit('SEND_MESSAGE', {
                                author: this.socket.id,
                                type: 'file',
                                data: {
                                    url: res.data[i].filename,
                                    fileName: res.data[i].originalname
                                }
                            });
                        }
                    }
                });
        }
    }

    _onFilesSelected(files) {
        // #1 too many files
        if (files.length <= 3 && this._checkFileSize(files)) {
            this.setState({
                selectedFiles: files
            });
        }else{
            // console.error('Only 3 images can be uploaded at a time')
        }
    }

    // #2 Uploading an file that is too large
    _checkFileSize = (files) => {
        let size = 15000000;
        let err = "";
        for(let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err += files[x].name +' is too large, please pick a smaller file\n';
            }
        }
        if (err !== '') {
            console.error(err);
            return false
        }
        return true;
    };

    componentDidMount() {
        this.socket.on('connect', () => {
            // console.log(this.socket.connected); // true
            if (this.socket.connected){
                this.setState({
                    client_id: this.socket.id
                })
            }
        });
    }

    render() {
        let messageList = this.state.messageList || [];

        return (
            <div className="Chat">
                <div className="Chat-header clearfix">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                    <div className="chat-about">
                        <div className="chat-with">Chat with {this.state.client_id}</div>
                        <div className="chat-num-messages">already {this.state.messageList.length} messages</div>
                    </div>
                    <i className="fa fa-star"></i>
                </div>

                <MessageList messages={messageList} socket={this.socket.id} />

                <UserInput
                    onMessage={this._sendMessage.bind(this)}
                    onFilesSelected={this._onFilesSelected.bind(this)}
                />
            </div> // end chat
        );
    }
}

export default Chat;
