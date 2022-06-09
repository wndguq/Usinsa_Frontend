import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { BACKEND_SERVER_URL } from "../../../global_variables";
import { setLogin } from "../../../redux/isValidLogin";
import customCookies from "../../../static/js/customCookies";
import BottomBar from "../../fragments/BottomBar";

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
        <div className="main-page-container ml-3 ">
            <p className="product-title" > 1:1 문의 상세보기 </p>

            <div className="border-b">
                {counselDetail &&
                    <>
                        <ul className="counsel-ul my-5 " style={{width: "905px"}}>
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
                        <p className="product-title mb-4" > 문의 주신 글 답변</p>        
                        <p className="counsel-txt mb-4" > {counselDetail.existsAnswer ? counselDetail.answerBody : " 아직 답변이 등록안됐습니다. "} </p>
                     </>
                }
                { counselDetail == undefined &&
                    <p className="n-table-none"> 문의 정보를 불러오지 못했습니다.</p>
                }

            </div>
            <BottomBar/>
        </div>
    )
}

export default CounselDtail