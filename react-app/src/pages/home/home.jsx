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
import UserInfo from '../../components/userinfo/userinfo';
import Search from '../../components/search/search';
import SearchPage from '../../components/search/search_page';
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
                            <Route path="/searchcard" exact component={SearchCard}/>
                            <Route path="/scard" exact component={SearchCard} />
                            <Route path="/" exact component={Search}/>
                            <Route path="/searchpage" exac st component={SearchPage}/>
                            <Route path="/userinfo" exact component={UserInfo}/>
                            <Route path="/user/:id" exact component={UserInfo}/>
                        </div>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Home;
