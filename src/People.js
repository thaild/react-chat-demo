import React, { Component } from 'react';

class People extends Component {
    render() {
        return (
            <div className="People-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search"/>
                    <i className="fa fa-search"></i>
                </div>
                <ul className="list">
                    <li className="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
                             alt="avatar"/>
                        <div className="about">
                            <div className="name">Vincent Porter</div>
                            <div className="status">
                                <i className="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>

                    <li className="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg"
                             alt="avatar"/>
                        <div className="about">
                            <div className="name">Aiden Chavez</div>
                            <div className="status">
                                <i className="fa fa-circle offline"></i> left 7 mins ago
                            </div>
                        </div>
                    </li>

                    <li className="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg"
                             alt="avatar"/>
                        <div className="about">
                            <div className="name">Mike Thomas</div>
                            <div className="status">
                                <i className="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>

                    <li className="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg"
                             alt="avatar"/>
                        <div className="about">
                            <div className="name">Erica Hughes</div>
                            <div className="status">
                                <i className="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>

                    <li className="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg"
                             alt="avatar"/>
                        <div className="about">
                            <div className="name">Ginger Johnston</div>
                            <div className="status">
                                <i className="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        );
    }
}

export default People;
