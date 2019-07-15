import React, {Component} from 'react';

// pages

import Header from '../../components//header/header';
import Login from '../../components/login/login';
import Register from '../../components/register/register';

class Home extends Component{

    render(){
        return(
            <div>
                <Header />
                <Register />
                <Login />
            </div>
        );
    }
}

export default Home;