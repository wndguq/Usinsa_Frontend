import customCookies from "./customCookies";

function apiErrorHandler(status, message){
    
    if(status == 3002){
        alert(message);
        return "logOut";
    }else if(status == 3003){

    }
}

export default apiErrorHandler