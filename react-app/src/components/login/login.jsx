import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/AuthService';
import './login.css';

// thunk asynchronous actions

class Login extends Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.AuthService = new AuthService()
    }
    state ={
        username:"",
        password:"",
    }
    
    componentWillMount(){
        if(this.AuthService.loggedIn()){
            this.props.history.replace('/')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.AuthService.login(this.state.username, this.state.password).then(res => {
            this.props.history.replace('/')
        }).catch(err => {
            alert(err);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render(){
        return(
            <div className="login">
                <div className ="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border">
                    <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} method="">
                                <div className="form-group row">
                                    <label htmlFor="username" className="col-md-4 col-form-label text-md-right">Username</label>
                                    <div className="col-md-6">
                                        <input type="text" id="username" className="form-control" name="username" onChange={this.handleChange} required autoFocus></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                    <div className="col-md-6">
                                        <input type="text" id="password" className="form-control" name="password" onChange={this.handleChange} required autoFocus></input>
                                    </div>
                                </div>
                                <div className="col-md-6 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                    
                                    <a href="#" className="btn btn-link">
                                        Forgot Your Password?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>  
        );
    }
}



export default Login;