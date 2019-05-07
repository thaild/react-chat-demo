import React from 'react';
import FileIcon from "../icons/FileIcon";

const FileMessage = (props) => {
    return (
        <a className="message--file" href={"/upload/"+props.message.data.url} download={props.message.data.fileName}>
            <FileIcon />
            <p>{props.message.data.fileName}</p>
        </a>
    )
}

export default FileMessage