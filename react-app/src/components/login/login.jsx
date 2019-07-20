import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import {PostData} from '../../services/PostData';

import './login.css';

class Login extends Component{

    state ={
        username: "",
        password:" ",
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        PostData('login', this.state).then((result) =>{
            let response = result;
            console.log(response)
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
                                <div class="form-group row">
                                    <label for="username" class="col-md-4 col-form-label text-md-right">Username</label>
                                    <div class="col-md-6">
                                        <input type="text" id="username" class="form-control" name="username" onChange={this.handleChange} required autofocus></input>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                    <div class="col-md-6">
                                        <input type="text" id="password" class="form-control" name="password" onChange={this.handleChange} required autofocus></input>
                                    </div>
                                </div>
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                    
                                    <a href="#" class="btn btn-link">
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth.users  
    }
}

export default connect(mapStateToProps)(Login);