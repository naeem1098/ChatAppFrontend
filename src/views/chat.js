import React, {Component} from 'react';
import ChatComponent from './chatComponent';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return ( 
            <div className='container-fluid'>
                <div className="row">
                    <div className='col-sm-2 col-md-3 col-lg-4'>
                        <h5>users</h5>
                    </div>
                    <div className='col-sm-2 col-md-3 col-lg-4'>
                        <ChatComponent />
                    </div>
                    <div className='col-sm-2 col-md-3 col-lg-4'>
                        <h5>Free area</h5>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Chat;