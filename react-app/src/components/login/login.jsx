import React, {Component} from 'react';


import './login.css';

class Login extends Component{
    render(){
        return(
            <div className="login">
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div className="card border">
                    <div className="card-header">Sign Up</div>
                        <div className="card-body">
                        <form action="" method="">
                            <div class="form-group row">
                                <label for="users_name" class="col-md-4 col-form-label text-md-right">Name</label>
                                <div class="col-md-6">
                                    <input type="text" id="users_name" class="form-control" name="users-name" required autofocus></input>
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
            </div>
            
        );

    }
}

export default Login;