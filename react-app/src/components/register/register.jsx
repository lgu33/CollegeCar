import React, {Component} from 'react';


import './register.css';
import { PostData } from '../../services/PostData';

class Register extends Component{

    state = {
        first_name: "", 
        last_name: "", 
        username: "",
        email: "", 
        dob: "", 
        password: "",
        r_password: "",
        educational_attainment: "",
    }

    handleSubmit = (e) => {
        e.preventDefault();
        PostData('register', this.state).then((result) => {
            let response = result;
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    render(){
        return(
            <div className="login">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div className="card border">
                    <div className="card-header">Sign Up</div>
                        <div className="card-body">
                        <form onSubmit={this.handleSubmit} > 

                            <div className="form-group row">
                                <label htmlFor="users_first_name" className="col-md-4 col-form-label text-md-right">First Name</label>
                                <div className="col-md-6">
                                    <input type="text" id="first_name" className="form-control" name="users-first-name" onChange={this.handleChange} required autoFocus></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="users_last_name" className="col-md-4 col-form-label text-md-right">Last Name</label>
                                <div className="col-md-6">
                                    <input type="text" id="last_name" className="form-control" name="users-last-name" onChange={this.handleChange} required autoFocus></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="username" className="col-md-4 col-form-label text-md-right">Username</label>
                                <div className="col-md-6">
                                    <input type="text" id="username" className="form-control" name="username" onChange={this.handleChange} required autoFocus></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div className="col-md-6">
                                    <input type="text" id="email" className="form-control" name="email-address" onChange={this.handleChange} required autoFocus></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Date ofs Birth</label>
                                <div className="col-md-6">
                                    <input type="date" className="form-control" id="dob" placeholder="Date ofd Birth" onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                <div className="col-md-6">
                                    <input type="password" id="password" className="form-control" name="password"  data-minlength="6" onChange={this.handleChange} required></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="repeat_password" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                <div className="col-md-6">
                                    <input type="password" id="r_password" className="form-control" name="repeatpassword" data-match="#password" data-match-error="these don't match" onChange={this.handleChange} required></input>
                                    
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="sel1" className="col-md-4 col-form-label text-md-right">Educational Attainment</label>
                                <div className="col-md-6">
                                    <select className="form-control" id="educational_attainment" onChange={this.handleChange}>
                                        <option hidden></option>
                                        <option>Some High School</option>
                                        <option>High School Degree</option>
                                        <option>Undergraduate Student</option>
                                        <option>Bachelor's Degree</option>
                                        <option>Master's Degree</option>
                                        <option>Doctoral Degree</option>     
                                    </select>
                                </div>
                            </div> 
                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Register
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

export default Register;