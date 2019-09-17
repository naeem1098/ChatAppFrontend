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
        <h3>username : {this.state.data.username}</h3>
        <h4>email : {this.state.data.email}</h4>
        <h4>password : {this.state.data.password}</h4>
    </div>
);
render() { 
    return ( 
        <div className="shadow-sm p-3 mb-5 bg-white rounded">
            <h1>Home Component</h1>
            {
                (this.state.data !== undefined) ? this.userProfile() : null 
            }
        </div>
    );
}
}
 
export default Home;