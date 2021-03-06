import React, { Component } from 'react';
import Message from "./Messages";


class MessageList extends Component {

    componentDidUpdate(prevProps, prevState) {
        this.scrollList.scrollTop = this.scrollList.scrollHeight;
    }

    render () {
        return (
            <div className="chat-history" ref={el => this.scrollList = el}>
                <ul>
                    {this.props.messages.map((message, i) => {
                        return this.props.socket === message.author ? <Message message={message} key={i} right={true}/> :
                            <Message message={message} key={i} right={false}/>;
                    })}
                </ul>
            </div>
        )
    }
}

export default MessageList