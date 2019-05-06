import React, { Component } from 'react'
import TextMessage from "./TextMessage";
import FileMessage from "./FileMessage";

class Message extends Component {

    _renderMessageContentOfType(type){
        switch (type) {
            case 'text':
                return <TextMessage message={this.props.message}/>;
            case 'file':
                return <FileMessage message={this.props.message}/>;
            default:
                console.error(`Attempting to load message with unsupported file type '${type}'`)
        }
    }

    render () {
        const messageType = this.props.message.type;
        const messageContent = this._renderMessageContentOfType(messageType);

        const isReceiver = this.props.message.author !== "me";

        if (isReceiver) {
            return <Receiver message={this.props.message} messageContent={messageContent}/>;
        } else {
            return <Sender message={this.props.message} messageContent={messageContent}/>;
        }
    }
}

export default Message

class Sender extends Component {
    render () {
        return (
            <li className="clearfix">
                <div className="message-data align-right">
                    <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                    <span className="message-data-name">{this.props.message.author}</span> <i className="fa fa-circle me"></i>

                </div>
                <div className="message other-message float-right">
                    {this.props.messageContent}
                </div>
            </li>
        )
    }
}

class Receiver extends Component {
    render () {
        return (
            <li>
                <div className="message-data">
                    <span className="message-data-name"><i className="fa fa-circle online"></i> {this.props.message.author}</span>
                    <span className="message-data-time">10:12 AM, Today</span>
                </div>
                <div className="message my-message">
                    {this.props.messageContent}
                </div>
            </li>
        )
    }
}