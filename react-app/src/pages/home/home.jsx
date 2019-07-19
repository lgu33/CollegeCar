import React, {Component, Fragment} from 'react';

// pages
import './home.css'

import Header from '../../components//header/header';
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import UserInfo from '../../components/userinfo/userinfo';

class Home extends Component{

    render(){
        return(
            <div className="appWrap">
                <Header />
                <div className="container">
                    <Register />
                </div>
            </div>
        );
    }
}

export default Home;