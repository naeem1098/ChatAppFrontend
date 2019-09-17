import React from 'react';
import io from "socket.io-client";
import decode from 'jwt-decode';

// import Header from './Main/Header';


class ChatComponent extends React.Component{

        constructor(props) {
            super(props);

            this.state = {
                // username: '',
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
            console.log(token);
            if((token !== undefined) && (token !== null)){
                this.setState({data: decode(token).foundUser, userToken: token}, () => {
                    this.socket.emit('REGISTER_USER', token);
                });
            }
        }

        render(){

        return(
            <div>
                <div className="d-flex flex-column bd-highlight mb-3">
                    <div className="p-2 bd-highlight">
                        <h3>Chat</h3>
                    </div>
                    <div className="p-2 bd-highlight">
                        
                        <div className="">
                            {this.state.messages.map((message, i) => {
                                return (
                                    // <div>{message.author}: {message.message}</div>
                                    <div key={i}>{message.message}</div>
                                )
                            })}
                        </div>
                        
                         {/* <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div> */}
                        
                    </div>
                    <div className="p-2 bd-highlight">
                        <form className="form-group" onSubmit={this.handleSubmit} >

                            <input type="text" placeholder=" type message" name='message' className="form-control col-sm-5 d-inline-flex mr-2" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} />
                            <button className="btn btn-primary d-inline-flex" onClick={this.sendMessage}>Send</button>
                        </form>
                    </div>
                </div>    
            </div>
        );
    }
}

export default ChatComponent;