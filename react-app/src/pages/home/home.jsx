import React, {Component, Fragment} from 'react';

// styling
import './home.css'

//import Header from '../../components//header/header';
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import UserInfo from '../../components/userinfo/userinfo';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import withAuth from '../../components/withAuth';


// const checkAuth = () =>{
//     const token = localStorage.getItem('auth_token')
//     const refresh_token = localStorage.getItem('refreshToken')
//     if(!token || !refresh_token){
//         return false;
//     }




//     return true;
// }

// function AuthRoute({ component: Component, ...rest }) {
//     return (
//       <Route {...rest} render={props =>
//           checkAuth() ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{pathname: "/user/1", state: { from: props.location }}}
//             />
//           )
//         }
//       />
//     );
//   }

//<AuthRoute exact path="/auth" component={Auth} />

class Home extends Component{

    render(){
        return(
            <Router>
                <div className="appWrap">
                    
                    <Switch>
                        <div className="container">
                            <Route path="/register" exact component={Register}/>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/" exact component={UserInfo}/>
                            <Route path="/user/:id" exact component={UserInfo}/>
                        </div>
                    </Switch> 
                </div>
            </Router>
            
        );
    }
}

export default Home;