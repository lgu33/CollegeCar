import React, {Component} from 'react';
import AuthService from '../services/AuthService';


export default function withAuth(AuthComponent){
    const Auth = new AuthService();
    return class AuthWrapped extends Component{
        constructor(){
            super();
            this.state = {
                user:null
            }
        }
        componentWillMount(){
            if(!Auth.loggedIn()){
                debugger
                this.props.history.replace('/login');
            }
            else{
                try{
                    debugger
                    const profile = Auth.getProfile();
                    this.setSate({
                        user:profile
                    })
                }catch(err){
                    Auth.logout();
                    debugger
                    this.props.hisotry.replace('/login');
                    debugger
                }
            }
        }
        render(){
            if(this.state.user){
                return(<AuthComponent {...this.props} {...this.state}/>)
            }
            else{
                return null;
            }
        }
    }
}