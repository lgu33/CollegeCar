import React, {Component, Fragment} from 'react';

// styling
import './home.css'

//import Header from '../../components//header/header';
import Header from '../../components/header/header';
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import UserInfo from '../../components/userinfo/userinfo';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import requireAuth from '../../utils/requireAuth';

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
                            <Route path="/" exact component={requireAuth(UserInfo)}/>
                            <Route path="/user/:id" exact component={requireAuth(UserInfo)}/>
                        </div>
                    </Switch> 
                </div>
            </Router>
            
        );
    }
}

export default Home;