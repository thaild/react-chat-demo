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

        return this.props.right ? (
            <li className="clearfix">
                <div className="message-data align-right">
                    <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                    <span className="message-data-name">{this.props.message.author} </span>
                    <i className="fa fa-circle me"></i>

                </div>
                <div className="message other-message float-right">
                    {messageContent}
                </div>
            </li>
        ) : (
            <li>
                <div className="message-data">
                    <span className="message-data-name">
                        <i className="fa fa-circle online"></i>{this.props.message.author}</span>
                    <span className="message-data-time">10:12 AM, Today</span>
                </div>
                <div className="message my-message">
                    {messageContent}
                </div>
            </li>
        );
    }
}

export default Message