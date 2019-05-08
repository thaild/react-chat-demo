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
        this.socket.on('HANDLE_CLIENT_DISCONNECT', (client) => this.disconnectPeoples(client) );
    }

    componentWillMount() {
        this.setState({
            peoples: this.state.initial
        });
    }

    componentDidMount() {
    }

    connectedPeoples(clients) {
        clients.map((client, i) => {
            if (!this.state.peoples.find((people) => people.name === client)) {
                this.setState({
                    peoples: [...this.state.peoples, {
                        name: client || 'N/A',
                        status: this.socket.connected ? 'online' : 'offline',
                        profilePic: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg'
                    }]
                });
            }
            return 0;
        });
    }

    disconnectPeoples(client) {
        var peoples = this.state.peoples;

        for (let i = 0; i < peoples.length; i++){
            if (peoples[i].name === client){
                peoples[i].status = 'offline';
            }
        }

        this.setState({peoples: peoples });
    }

    removeDisconnectedPeoples() {
        this.setState({
            peoples: this.state.peoples.filter( (client) => client.status === 'online')
        });
    }

    componentDidUpdate(prevProps, prevState) {
        setTimeout(this.removeDisconnectedPeoples.bind(this), 9000);
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

const People = ({profilePic, name, status}) =>
    <li className="clearfix">
        <img src={profilePic} alt="avatar"/>
        <div className="about">
            <div className="name">{name}</div>
            <div className="status">
                <i className={`fa fa-circle ${status}`}></i> {status}
            </div>
        </div>
    </li>;

export default Peoples;
