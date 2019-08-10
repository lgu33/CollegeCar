import React, {Component, Fragment} from 'react';

// styling
import './home.css'

//import Header from '../../components//header/header';
import Header from '../../components/header/header';
import Login from '../../components/login/login';
import Register from '../../components/register/register';
//import UserInfo from '../../components/userinfo/userinfo';
import requireAuth from '../../utils/requireAuth';
import SearchCard from '../../components/searchcard/SearchCard';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class Home extends Component{

    render(){
        return(
            <Router>
                <div className="appWrap">
                <Header />
                    <Switch>
                        <div className="container">
                            <Route path="/register" exact component={Register}/>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/" exact component={SearchCard}/>
                            
                            <Route path="/scard" exact component={SearchCard} />
                        </div>
                    </Switch> 
                </div>
            </Router>
            
        );
    }
}

export default Home;