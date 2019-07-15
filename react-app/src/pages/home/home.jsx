import React, {Component} from 'react';

// pages

import Header from '../../components//header/header';
import Login from '../../components/login/login';

class Home extends Component{

    render(){
        return(
            <div>
                <Header />
                <Login />
            </div>
        );
    }
}

export default Home;