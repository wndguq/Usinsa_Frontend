import cookies from 'react-cookies';

function save (key, value, expireDate){
    const expires = new Date();
    expires.setMilliseconds(+expireDate);

    cookies.save(key, value, {
        path: '/',
        expires
    })
}

function existsJWT(){
    const jwtAccessToken = cookies.load('accessToken');
    const jwtReFreshToken = cookies.load('refreshToken');
    return jwtAccessToken && jwtReFreshToken ? true : false;
}

function logOut(){
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
}

function getAccessToken(){
    return cookies.load('accessToken');
}

function getRefreshToken(){
    return cookies.load('refreshToken');
}

export default {save, existsJWT, logOut, getAccessToken, getRefreshToken};