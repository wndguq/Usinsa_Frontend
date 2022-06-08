import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { BACKEND_SERVER_URL } from "../../../global_variables";
import { setLogin } from "../../../redux/isValidLogin";
import customCookies from "../../../static/js/customCookies";

function CounselDtail(){

    let { id } = useParams();

    const [counselDetail, setCounselDetail] = useState();
    const { isValidLogin } = useSelector(state => state.isValidLogin);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if(isValidLogin){
            axios.get(BACKEND_SERVER_URL + "api/v1/qna/detail/" + id, {
                headers: {
                    "X-AUTH-TOKEN": customCookies.getAccessToken(),
                    "REFRESH-TOKEN": customCookies.getRefreshToken()
                }}).then(res => {
                    console.log(res.data.data);
                    setCounselDetail(res.data.data);
                })
                .catch(error => {
                    const result = apiErrorHandler(error.response.status, error.response.data);
                    if(result =="logOut"){
                        customCookies.logOut();
                        dispatch(setLogin(false));         
                    }
            })
        }else{
            alert("로그인이 필요한 서비스입니다.");
            return (<Navigate replace to="/login/login" />)
        }
    }, [id])

    return(
        <div className="main-page-container">
            <p className="ml-3 product-title" > 1:1 문의 상세보기 </p>

            {counselDetail &&
                <ul className="counsel-ul mt-4" style={{width: "900px"}}>
                    <li>
                        <p className="first-p"> 문의 유형</p>
                        <p className="second-p"> {counselDetail.qnaCategory}</p>
                    </li>
                    <li>
                        <p className="first-p"> 작성자</p>
                        <p className="second-p">{counselDetail.name}</p>
                    </li>
                    <li>
                        <p className="first-p"> 휴대전화</p>
                        <p className="second-p">{counselDetail.phone}</p>
                    </li>
                    <li>
                        <p className="first-p"> 이메일</p>
                        <p className="second-p">{counselDetail.email}</p>
                    </li>
                    <li>
                        <p className="first-p"> 제목</p>
                        <p className="second-p">{counselDetail.title}</p>
                    </li>
                    <li className="display-f counsel-body">
                        <p className="first-p"> 문의 내용</p>
                        <p className="second-p counsel-body">{counselDetail.body}</p>
                    </li>
                </ul>            
            }
            { counselDetail == undefined &&
                <p className="n-table-none"> 문의 정보를 불러오지 못했습니다.</p>
            }

        </div>
    )
}

export default CounselDtail