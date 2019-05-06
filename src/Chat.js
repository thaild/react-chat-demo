import React, { Component } from 'react';
import messageHistory from './components/messageHistory';
import './Chat.scss';
import MessageList from "./components/MessageList";
import UserInput from "./components/UserInput";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: messageHistory,
            newMessagesCount: 0,
            isOpen: false,
            messageResponses: [
                'Why did the web developer leave the restaurant? Because of the table layout.',
                'How do you comfort a JavaScript bug? You console it.',
                'An SQL query enters a bar, approaches two tables and asks: "May I join you?"',
                'What is the most used language in programming? Profanity.',
                'What is the object-oriented way to become wealthy? Inheritance.',
                'An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer, alcohol'
            ],
        };
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'me',
                    type: 'text',
                    data: { text }
                }]
            });

            const self = this;
            setTimeout(function() {
                self._responseMessage();
            }, 1500);

        }
    }

    _responseMessage() {
        const text = this.state.messageResponses[Math.floor(Math.random() * this.state.messageResponses.length)];
        this.setState({
            messageList: [...this.state.messageList, {
                author: 'them',
                type: 'text',
                data: { text }
            }]
        })
    }

    _onFilesSelected(fileList) {
        const objectURL = window.URL.createObjectURL(fileList[0]);
        this.setState({
            messageList: [...this.state.messageList, {
                type: 'file', author: "me",
                data: {
                    url: objectURL,
                    fileName: fileList[0].name
                }
            }]
        })
    }
    render() {
        let messageList = this.state.messageList || [];

        return (
            <div className="Chat">
                <div className="Chat-header clearfix">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar"/>
                    <div className="chat-about">
                        <div className="chat-with">Chat with Vincent Porter</div>
                        <div className="chat-num-messages">already 1 902 messages</div>
                    </div>
                    <i className="fa fa-star"></i>
                </div>

                <MessageList messages={messageList} />

                <UserInput
                    onMessage={this._sendMessage.bind(this)}
                    onFilesSelected={this._onFilesSelected.bind(this)}
                />
            </div> // end chat
        );
    }
}

export default Chat;
