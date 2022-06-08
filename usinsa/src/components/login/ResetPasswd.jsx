import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BACKEND_SERVER_URL } from "../../global_variables";

function Password(){

    let { code } = useParams();    
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        password: '',
        rePassword: ''
    })

    const {password, rePassword} = inputValue;

    const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const isValidPassword = password.length >= 8 && specialLetter >= 1;
    const isValidRePassword = password == rePassword;

    const getIsActive = isValidPassword && isValidRePassword;

    const handleInput = (e) =>{
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    }

    const formAction = (event) => {
        event.preventDefault();
        if ( !getIsActive ) {
            if (isValidPassword) alert("비밀번호는 8자리 이상, 특수문자를 포함해야합니다.");
            else alert("비밀번호는 8자리 이상이어야 합니다.");
            
            return ;
        }

        axios.post( BACKEND_SERVER_URL + "api/v1/users/reset-password", {
            "newPassword": password,
            "newPasswordConfirm": rePassword,
            "code": code
        })
        .then( res => {
            if(res.status != 200) alert("이메일을 확인해주세요. 메일이 오지 않는다면 스펨함을 확인해주세요.");
            else {
                alert("비밀번호 변경 완료.");
                navigate('/');
            }
        })
        .catch( error => {
            alert("비밀번호 변경 시간 만료.");
        });
    }

    return(
        <div className="join-form">
            <h4 className="join-title">
                비밀번호 변경
            </h4>
            <form className="join-container pb-4" onSubmit={formAction}>
                <p className="find-pw-txt">비밀번호 입력</p>
                <input className="find-pw-id mt-2 mb-1" type="password" name="password" placeholder="비밀번호 입력" onChange={handleInput}/>
                <input className="find-pw-id mt-2 mb-4" type="password" name="rePassword" placeholder="비밀번호 다시 입력" onChange={handleInput}/>

                <input className={"join-button " + (getIsActive ? "active-join-button" : "")} 
                        type="submit" value="비밀번호 변경하기"/>
            </form>

            <div className="pb-2"><Link to="/login/login"> 로그인 하러가기</Link></div>
            <div><Link to="/"> 메인으로 돌아기기</Link></div>
        </div>
    )
}

export default Password