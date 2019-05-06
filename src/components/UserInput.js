import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UserInput.scss';

class UserInput extends Component {

    _onFilesSelected(event) {
        if (event.target.files && event.target.files.length > 0) {
            this.props.onFilesSelected(event.target.files)
        }
    }

    render() {
        return (
            <div className="chat-message clearfix">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onMessage(this.textArea.value);
                    this.textArea.value = '';
                    this.files.value = '';
                }}>

                    <textarea rows="3"
                              ref={(e) => { this.textArea = e; }}
                              className="demo-test-area--text"
                              placeholder="Type your message...."/>

                    <button className="user-input--buttons">
                        <input
                            type="file"
                            name="files[]"
                            multiple
                            ref={(e) => { this.files = e; }}
                            onChange={this._onFilesSelected.bind(this)}
                        />
                    </button>

                    <button className="">Send Message!</button>
                </form>
            </div>
        );
    }
}

UserInput.propTypes = {
    onFilesSelected: PropTypes.func.isRequired,
};

export default UserInput;