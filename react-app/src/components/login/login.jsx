import React, {Component} from 'react';


import './login.css';

class Login extends Component{
    render(){
        return(
            <div className="login">
                <div className="container">
                    <div className ="row justify-content-center">
                    <div className="col-md-6">
                    <div className="card border">
                    <div className="card-header">Login</div>
                        <div className="card-body">
                        <form action="" method="">
                            <div class="form-group row">
                                <label for="username" class="col-md-4 col-form-label text-md-right">Username</label>
                                <div class="col-md-6">
                                    <input type="text" id="username" class="form-control" name="username" required autofocus></input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input type="text" id="password" class="form-control" name="password" required autofocus></input>
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
            </div>
            
        );

    }
}

export default Login;