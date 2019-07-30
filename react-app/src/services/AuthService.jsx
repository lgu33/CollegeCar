import decode from 'jwt-decode';
import base64 from 'react-native-base64'

export default class AuthService{
    constructor(domain){
        this.domain = domain || 'http://127.0.0.1:5000';
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    register({first_name, last_name, username, email, dob, password, r_password, educational_attainment}){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin','http://localhost:3000');
        
        return this.fetch(this.domain + '/auth/register', {
            method:"POST",
            mode: 'cors',
            headers: headers, 
            body: JSON.stringify({
                first_name, last_name, username, email, dob, password, r_password, educational_attainment,
            })
        }).then(res=> {
            this.setToken(res.auth_token);
            return Promise.resolve(res);
        })
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
            this.setToken(res.auth_token);
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
        return !!token && !this.isTokenExpired()
    }

    isTokenExpired(token){
        try{
            const decoded = decode(token);
            debugger
            if (decoded.exp < new Date().getTime()/ 1000){
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
        debugger
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