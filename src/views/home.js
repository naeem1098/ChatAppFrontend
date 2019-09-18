import React, {Component} from 'react';
import decode from 'jwt-decode';

class Home extends Component {
constructor(props) {
    super(props);
    this.state = { 
        data: undefined
    }
}

componentDidMount() {
    const token = localStorage.getItem('authToken');
    // console.log(token);
    if((token !== undefined) && (token !== null)){
        this.setState({data: decode(token).foundUser});
    } else {
        window.history.pushState(null, null, '/login');
    }
}

userProfile = () => (
    <div>
        <img src={"http://localhost:3100/userImage/"+this.state.data.userImage} alt="" width="75px" height="75px" className="rounded-circle" />
        <h3>Welcome {this.state.data.username}</h3>
        <h4>email : {this.state.data.email}</h4>
    </div>
);
render() { 
    return ( 
        <div className="shadow-sm p-3 mb-5 bg-white rounded">

            {
                (this.state.data !== undefined) ? this.userProfile() : null 
            }
        </div>
    );
}
}
 
export default Home;