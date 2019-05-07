import React, { Component } from 'react';

class Peoples extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peoples: [],
            initial: [{
                name: 'Bot',
                status: 'online',
                profilePic: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg'
            }]
        };

        this.socket = this.props.socket;
        this.socket.on('HANDLE_CLIENT_CONNECT', (clients) => this.connectedPeoples(clients) );
    }

    componentDidMount() {
        // this.socket.on('connect', () => {
        //     console.log(this.socket.connected); // true
        //     if (this.socket.connected){
        //         this.setState({
        //             peoples: [...this.state.peoples, {
        //                 name: this.socket.id.substring(0, 15) || 'N/A',
        //                 status: this.socket.connected ? 'online' : 'offline',
        //                 profilePic: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg'
        //             }]
        //         });
        //     }
        //     console.log(this.state.peoples.length)
        // });
    }

    connectedPeoples(clients) {
        // console.log(clients);

        this.setState({
            peoples: this.state.initial
        });

        clients.map((client, i) => {
            this.setState({
                peoples: [...this.state.peoples, {
                    name: client || 'N/A',
                    status: this.socket.connected ? 'online' : 'offline',
                    profilePic: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg'
                }]
            });
            return 0;
        })

    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollList.scrollTop = this.scrollList.scrollHeight;
    }

    render() {
        return (
            <div className="People-list" id="people-list" ref={el => this.scrollList = el}>
                <div className="search">
                    <input type="text" placeholder="search"/>
                    <i className="fa fa-search"></i>
                </div>
                <PeopleList peoples={this.state.peoples}/>
            </div>
        );
    }
}

const PeopleList = ({peoples}) =>
    <ul>
        {peoples.map((people, i) => {
            return <People {...people} key={i} />
        })}
    </ul>;

const People = ({profilePic, name}) =>
    <li className="clearfix">
        <img src={profilePic} alt="avatar"/>
        <div className="about">
            <div className="name">{name}</div>
            <div className="status">
                <i className="fa fa-circle online"></i> online
            </div>
        </div>
    </li>;

export default Peoples;
