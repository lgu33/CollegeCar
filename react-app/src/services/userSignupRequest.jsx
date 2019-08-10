export function userSignupRequest(type, userData){
    let BaseUrl = 'http://127.0.0.1:5000/';

    return new Promise((resolve, rejest)=>{
        fetch(BaseUrl+type, {
            method: 'POST', 
            body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
        })
    });
}