import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import customCookies  from '../../static/js/customCookies';
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./../../redux/isValidLogin";

function SignIn(){

    const dispatch = useDispatch();

    const { isValidLogin } = useSelector(state => state.isValidLogin);
    console.log(isValidLogin);

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: '',
        password: ''
    })

    const signIn = () => {
        dispatch(setLogin(true));
    }

    const handleInput = (e) =>{
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    const {username, password} = inputValue;

    const isValidUserNameAndPassword = username.length >=1 && password.length >= 1;

    const formAction = (event) =>{
        event.preventDefault();
        if(!isValidUserNameAndPassword){        
            alert("아이디 또는 패스워드를 확인해주세요");
            return ;
        }

        axios.post("http://localhost/usinsa/api/v1/signin", {
                "username": username,
                "password": password
        })
        .then(res =>{
            customCookies.save('accessToken', res.data.data.accessToken, res.data.data.accessTokenExpireDate );
            customCookies.save('refreshToken', res.data.data.refreshToken, res.data.data.accessTokenExpireDate );

            signIn();
            navigate('/');
        })
        .catch(

        );
    }

    return(
        <div className="member-join">
            <div className="join-form">
                <h3 className="join-title">
                    로그인
                </h3>
                <form id="loginForm" className="join-container" onSubmit={formAction}>
                    <div className="my-1">
                        <div className="input-wrap">
                            <input className="join-input-text" 
                                type="text" maxLength={11} 
                                placeholder="아이디"
                                name="username" onChange={handleInput}/>
                        </div>
                    </div>

                    <div className="my-1">
                        <div className="input-wrap">
                            <input className="join-input-text" type="password" 
                                placeholder="비밀번호"
                                name="password" onChange={handleInput}/>
                        </div>
                    </div>


                    <input className="join-button active-signup-button mt-4"
                        type="submit" value="로그인"></input>

                    <div className="my-1" style={{height: "30px"}}>
                        <div className="float-right">
                        <Link to="/login/find-id" className="text-color-gray"> 아이디 찾기</Link>
                        <span> | </span>
                        <Link to="/login/find-pw" className="text-color-gray"> 비밀번호 찾기</Link>
                        </div>
                    </div>                        
                </form>
                <Link to="/"> 메인으로 돌아가기</Link>
            </div>
        </div>
    )
}

export default SignIn