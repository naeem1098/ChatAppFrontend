import React from 'react';
import io from "socket.io-client";
import decode from 'jwt-decode';
import './chatComponent.css';
// import Header from './Main/Header';


class ChatComponent extends React.Component{

        constructor(props) {
            super(props);

            this.state = {
                userData: false,
                message: '',
                messages: []
            };

            this.socket = io('localhost:3100');

            this.socket.on('RECEIVE_MESSAGE', function(data){
                addMessage(data);
            });

            this.socket.on('USER_REGISTERED', (isRegistered) => {
                if(isRegistered) {
                    this.setState({
                        userRegistered: true
                    })
                    console.log(isRegistered);
                }
            })

            const addMessage = data => {
                console.log(data);
                this.setState({messages: [...this.state.messages, data]});
                console.log(this.state.messages);
            };

            this.sendMessage = this.sendMessage.bind(this)
        }

        sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                id: 1,
                message: this.state.message
            })
            
            this.setState({message: ''});
        }

        componentDidMount() {
            const token = localStorage.getItem('authToken');
            if((token !== undefined) && (token !== null)){
                this.setState({userData: decode(token).foundUser}, () => {
                    const chat = {
                        userId: this.state.userData.userId,
                        chatWith: this.props.friend
                    }
                    console.log(chat)
                    this.socket.emit('REGISTER_USER', chat);
                });
            }
        }

        render(){

        return(
            <div>
                <div className="d-flex flex-column bd-highlight mb-3">
                        
                    <div data-spy="scroll" data-offset="auto">
                        <div id="message_box">
                            {this.state.messages.map((message, i) => {
                                return (
                                    // <div>{message.author}: {message.message}</div>
                                    <div key={i}>{message.message}</div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="p-2 bd-highlight">
                        <form onSubmit={this.handleSubmit} >
                            <div className="row">
                                <input type="text" placeholder=" type message" name='message' className="col-9 col-sm-10 col-md-9 col-lg-10 form-control mr-auto" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} />
                                <button className="btn btn-primary" onClick={this.sendMessage}>Send</button>
                            </div>
                        </form>
                    </div>
                </div>    
            </div>
        );
    }
}

export default ChatComponent;