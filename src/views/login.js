import React, {Component} from 'react';
import {Post} from './../utils/rest_client';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: ''
         }
         this.onEmailChange = this.onEmailChange.bind(this);
         this.onPasswordChange = this.onPasswordChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }

    onEmailChange(e){
        e.preventDefault();
        this.setState({email: e.target.value})
        // console.log("onEmailChange",e.target.value);
    }

    onPasswordChange(e){
        e.preventDefault();
        this.setState({password: e.target.value})
        // console.log("onPasswordChange",e.target.value);
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password: e.target.password.value,
            remember: e.target.remember.checked
        }
        // console.log(user);
        Post('login', user)
        .then(data => {
            if(data !== "Unauthorised User") {
                localStorage.setItem('authToken', data.token);
                this.props.callbackFromParent(data.token);
            } else {
                console.log('failure', data)
            } 
        })
        .catch(error => console.log(error))
    }

    render() { 
        return ( 
            <div className='container'>
                <div className='row justify-content-center '>
                    <div className='col-md-6 align-self-center'>
                        <form onSubmit={this.onSubmit} id='login'>
                            <div className="form-group">
                                <h2 className='text-center'>Login Here</h2>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" onChange={this.onEmailChange}/>
                                <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.onPasswordChange}/>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="remember" />
                                <label className="form-check-label" htmlFor="remember">Remember me</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Login;