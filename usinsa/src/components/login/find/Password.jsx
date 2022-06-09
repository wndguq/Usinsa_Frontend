import axios from "axios";
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { BACKEND_SERVER_URL } from "../../../global_variables";

function Password(){

    const [inputValue, setInputValue] = useState('')

    const handleInput = (e) =>{
        const {name, value} = e.target;
        setInputValue(value);
    }
    const getIsActive = inputValue.length >= 1;

    const formAction = (event) =>{
        event.preventDefault();
        if(!getIsActive){
            alert("아이디를 입력해주세요.");
            return ;
        }

        axios.post(BACKEND_SERVER_URL + "api/v1/mail/reset-password", {"username": inputValue})
        .then(res =>{
            alert("이메일을 확인해주세요. 메일이 오지 않는다면 스펨함을 확인해주세요.");
        })
        .catch(error =>{
            alert("아이디가 맞는지 다시 확인해주세요.");
        });
    }

    return(
        <div className="join-form">
            <h4 className="join-title">
                비밀번호 찾기
            </h4>
            <form className="join-container pb-4" onSubmit={formAction}>
                <p className="find-pw-txt">비밀번호를 찾으려는 아이디</p>
                <input className="find-pw-id mt-2 mb-4" type="text" name="userName" placeholder="아이디 입력" onChange={handleInput}/>

                <input className={"join-button " + (getIsActive ? "active-join-button" : "")} 
                        type="submit" value="이메일로 코드 전송"/>
            </form>
            <div className="pb-2"><Link to="/login/login"> 로그인 하러가기</Link></div>
            <div><Link to="/"> 메인으로 돌아기기</Link></div>
        </div>
    )
}

export default Password