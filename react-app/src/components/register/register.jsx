import React, {Component} from 'react';


import './register.css';

class Register extends Component{
    render(){
        return(
            <div className="login">
                
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div className="card border">
                    <div className="card-header">Sign Up</div>
                        <div className="card-body">
                        <form action="" method="">
                            

                            <div class="form-group row">
                                <label for="users_first_name" class="col-md-4 col-form-label text-md-right">First Name</label>
                                <div class="col-md-6">
                                    <input type="text" id="users_first_name" class="form-control" name="users-first-name" required autofocus></input>
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <label for="users_last_name" class="col-md-4 col-form-label text-md-right">Last Name</label>
                                <div class="col-md-6">
                                    <input type="text" id="users_laster_name" class="form-control" name="users-last-name" required autofocus></input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="username" class="col-md-4 col-form-label text-md-right">Username</label>
                                <div class="col-md-6">
                                    <input type="text" id="username" class="form-control" name="username" required autofocus></input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input type="text" id="email_address" class="form-control" name="email-address" required autofocus></input>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input type="password" id="password" class="form-control" name="password" required></input>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="repeat_password" class="col-md-4 col-form-label text-md-right">Repeat Password</label>
                                <div class="col-md-6">
                                    <input type="password" id="repeat_password" class="form-control" name="repreat-password" required></input>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="sel1" className="col-md-4 col-form-label text-md-right">Educational Attainment</label>
                                <div className="col-md-6">
                                    <select class="form-control" id="sel1" >
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
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Register
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

export default Register;