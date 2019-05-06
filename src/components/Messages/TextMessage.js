import React from 'react';
import Linkify from 'react-linkify';

const TextMessage = (props) => {
    return (
        <Linkify properties={{ target: '_blank' }}>{props.message.data.text}</Linkify>
    )
}

export default TextMessage

