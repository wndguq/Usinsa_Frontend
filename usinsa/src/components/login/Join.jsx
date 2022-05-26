import { useState, useLayoutEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import  customCookies  from '../../static/js/customCookies';

import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./../../redux/isValidLogin";
import {BACKEND_SERVER_URL, FILE_REPOSITORY_URL} from './../../global_variables'

//import errorHandler from '../../static/js/errorHandler';

function Join(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isValidLogin } = useSelector(state => state.isValidLogin);

    useLayoutEffect(() => {
        if(isValidLogin){
            alert("로그아웃 후 시도해 주세요");
        }
    }, [])

    const signIn = () => {
        dispatch(setLogin(true));
    }

    // 항목별 데이터 변수, 체크박스 상태 변수
    const [inputValue, setInputValue] = useState({
        username: '',
        name: '',
        nickname: '',
        password: '',
        rePassword: '',
        email: '',
        phone: ''
    })
    const [checkBoxActive, setCheckboxActive] = useState(false);


    const { username, email, password, rePassword, phone, nickname, name } = inputValue;

    // state가 갱신될 때마다 각 항목에 맞는 유효성 검사
    const isValidEmail = email.includes('@') && email.includes('.');
    const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const isValidPassword = password.length >= 8 && specialLetter >= 1;
    const isValidInput = username.length >= 1 && password.length >= 1 && email.length >= 1 && nickname.length >= 1 && name.length >= 1;
    const isValidRePassword = password === rePassword;

    const getIsActive = isValidEmail && isValidPassword && isValidInput && checkBoxActive && isValidRePassword === true;

    // 데이터 입력 시 또는 체크박스 클릭 시 state 수정
    const isCheckBoxClicked = () => {
        setCheckboxActive(!checkBoxActive);
      };
    const handleInput = (e) =>{
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    // 가입하기 버튼 클릭 시
    // 유효성 검사 && 서버로 회원가입 요청
    // 기본 폼 테그 동작 
    const formAction = (event) =>{
        event.preventDefault();
        if(!getIsActive){
            alert("회원가입 필수 항목을 모두 기입해주세요.");
            return ;
        }

        console.log(password);
        axios.post(BACKEND_SERVER_URL + "api/v1/signup", {
                "username": username,
                "password": password,
                "email": email,
                "phone": phone,
                "nickname": nickname,
                "name": name
        })
        .then(res =>{
            customCookies.save('accessToken', res.data.data.accessToken, res.data.data.accessTokenExpireDate );
            customCookies.save('refreshToken', res.data.data.refreshToken, res.data.data.accessTokenExpireDate );

            alert("회원가입 성공");
            signIn();
            navigate('/');
        })
        .catch(

        );
    }

    return(
        <div className="member-join">
            {isValidLogin ? <Navigate replace to="/" /> : ''}
            <div className="join-form">
                <h3 className="join-title">
                    USINSA
                </h3>
                <form className="join-container" onSubmit={formAction}>
                    <div className="my-4">
                        <label className="join-label font-weight-bold"> 아이디 * </label>
                        <div className="input-wrap">
                            <input className="join-input-text" 
                                type="text" maxLength={11} 
                                placeholder="영문, 숫자 5~11자"
                                name="username" onChange={handleInput}/>
                        </div>
                    </div>

                    <div className="my-4">
                        <label className="join-label font-weight-bold"> 비밀번호 * </label>
                        <div className="input-wrap">
                            <input className="join-input-text" type="password" 
                                placeholder="영문, 숫자, 특수문자 조합 최소 8자"
                                name="password" onChange={handleInput}/>
                        </div>
                        <div className="input-wrap my-2">
                            <input className="join-input-text" type="password" placeholder="비밀번호 재입력"
                                name="rePassword" onChange={handleInput}/>
                        </div>                        
                    </div>

                    <div className="my-4">
                        <label className="join-label font-weight-bold"> 이름 * </label>
                        <div className="input-wrap">
                            <input className="join-input-text" 
                                type="text" 
                                name="name" onChange={handleInput}/>
                        </div>
                    </div>

                    <div className="my-4">
                        <label className="join-label font-weight-bold"> 닉네임 * </label>
                        <div className="input-wrap">
                            <input className="join-input-text" 
                                type="text" 
                                name="nickname" onChange={handleInput}/>
                        </div>
                    </div>                    

                    <div className="my-4">
                        <label className="join-label font-weight-bold"> 이메일 * </label>
                        <div className="input-wrap">
                            <input className="join-input-text" type="text" 
                                name="email" onChange={handleInput}/>
                        </div>
                        <label className="join-label text-xs"> 계정 분실 시 본인인증 정보로 활용됩니다. </label>
                    </div>

                    <div className="my-4">
                        <label className="join-label"> 전화번호 </label>
                        <div className="input-wrap">
                            <input className="join-input-text" type="text" 
                                maxLength={11} placeholder=" - 제외 "
                                name="phone" onChange={handleInput}/>
                        </div>
                    </div>

                    <div className="my-4">
                        <input type="checkbox" id="agree" onChange={isCheckBoxClicked}></input>
                        <label> 약관 동의하기 </label>
                        <br/>
                        <label> 개인정보 보관 3년 </label>
                    </div>
                    <input className={"join-button " + (getIsActive ? "active-join-button" : "")} 
                        type="submit" value="본인인증하고 가입하기"></input>
                </form>
                <Link to="/"> 메인으로 돌아가기</Link>
            </div>
        </div>
    )
}

export default Join