import React from 'react';

const TextMessage = (props) => {
    return (
        <span>{props.message.data.text}</span>
    )
};

export default TextMessage

