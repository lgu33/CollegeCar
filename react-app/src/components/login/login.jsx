import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import './login.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// thunk asynchronous actions

class Login extends Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        if(this.props.isAuthenticated){
            this.props.history.push('/')
        }
    }

    state ={
        username:"",
        password:"",
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state).then(res => {
            this.props.history.push('/profile')
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
                                </div>
                                <Link to='/register' className='btn btn-link'>
                                    Not a user? Register Here.
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>  
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}
  

export default connect(null, {login})(Login);