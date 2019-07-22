import decode from 'jwt-decode';
import base64 from 'react-native-base64'

export default class AuthService{
    constructor(domain){
        this.domain = domain || 'http://127.0.0.1:5000';
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }
    
    login(username, password){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin','http://localhost:3000');
        return this.fetch(this.domain + '/auth/login', {
            method:"POST",
            mode: 'cors',
            headers: headers, 
            body: JSON.stringify({
                username, 
                password
            })
        }).then(res=> {
            this.setToken(res.token);
            return Promise.resolve(res);
        })
    }
    
    fetch(url, options){
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        if(this.loggedIn()){
            headers['authorization'] = 'Bearer ${this.getToken()}'

        }
        return fetch(url, {
            headers, 
            ...options
        }).then(this._checkStatus).then(response => response.json())
    }
    
    getToken(){
        return localStorage.getItem('id_token');
    }
    
    setToken(idToken){
        return localStorage.setItem('id_token', idToken);
    }

    loggedIn(){
        const token = this.getToken();
        return !!token && !this.tokenExpired()
    }
    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if (decoded.exp < Date.now() /1000){
                return true;
            }else{
                return false;
            }
        }catch(e){
            return false;
        }
    }

    logout(){
        localStorage.removeItem('id_token');
    }

    getProfile(){
        return decode(this.getToken());
    }

    _checkStatus(response){
        if(response.status >= 200 && response.status < 300){
            return response;
        }
        else{
            let error  = new Error(response.statusText);
            error.reponse = response;
            throw error

        }
    }
}