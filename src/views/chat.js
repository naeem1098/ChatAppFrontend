import React, {Component} from 'react';
import ChatComponent from './chatComponent';
import User from './user';
import { getWithToken } from './../utils/data-service';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            currentChat: false
        }
        this.chatWith = this.chatWith.bind(this);
    }

    componentDidMount() {
        getWithToken('app/getAllUsers')
            .then((data) => {
                // console.log(data)
                this.setState({allUsers: data})
            })
            .catch(console.error);
    }

    chatWith(userId) {
        this.setState({currentChat: userId})
        console.log('Friend id : ', userId);
    }

    render() {
        return ( 
            <div className='container-fluid'>
                <div className="row">
                    <div className='col-sm-11 col-md-4 col-lg-4 p-5 rounded shadow-sm bg-primary m-2 mt-4'>
                        <h4 className="font-weight-bold text-white">Friends</h4>
                        <br />
                        {
                            this.state.allUsers !== [] && this.state.allUsers.map((user, i) => (
                                <User key={i} user={user} chatWith={this.chatWith} />
                            ))
                        }
                    </div>
                    <div className=' col-sm-11 col-md-4 col-lg-4 p-4 rounded shadow-sm bg-white m-2 mt-4'>
                        <h4 className="font-weight-bold text-primary">Chat</h4>
                        {this.state.currentChat !== false ? <ChatComponent friend={this.state.currentChat}/> : <strong>Please select a friend to chat with.</strong>}
                    </div>
                    <div className='col-sm-11 col-md-3 col-lg-3 p-5 rounded shadow-sm bg-light m-2 mt-4'>
                        <h4 className="font-weight-bold">Free Area</h4>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Chat;