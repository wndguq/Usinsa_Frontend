import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BottomBar from "../../fragments/BottomBar";
import { BACKEND_SERVER_URL } from "../../../global_variables";
import apiErrorHandler from "../../../static/js/apiErrorHandler";
import customCookies from "../../../static/js/customCookies";
import { setLogin } from "../../../redux/isValidLogin";

function Counsel(){

    const [counselInput, setCounselInput] = useState();
    const { isValidLogin } = useSelector(state => state.isValidLogin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useLayoutEffect( () => {
        axios.get(BACKEND_SERVER_URL + "api/v1/qna", {
            headers: {
                "X-AUTH-TOKEN": customCookies.getAccessToken(),
                "REFRESH-TOKEN": customCookies.getRefreshToken()
            }
        })
        .then(res => {
            setCounselInput(res.data.data.content);
        })
        .catch(error => {
            const result = apiErrorHandler(error.response.status, error.response.data);
            if(result =="logOut"){
                customCookies.logOut();
                dispatch(setLogin(false));
            }
        })
    }, [])

    const detailQnA = ( id ) => {
        navigate("/mypage/cs/counsel/detail/" + id);
    }

    return(
        <div className="main-page-container">
            <p className="ml-3 product-title" > 1:1 문의 </p>
            <table className="n-table mt-3 ml-2 border-b">
                <colgroup>
                    <col style={{width: "10%"}}></col>
                    <col style={{width: "30%"}}></col>
                    <col style={{width: "7%"}}></col>
                    <col style={{width: "7%"}}></col>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">문의 유형 </th>
                        <th scope="col">제목 </th>
                        <th scope="col">작성일</th>
                        <th scope="col">처리 상태</th>                   
                    </tr>
                </thead>
                <tbody>
                    {counselInput &&
                        counselInput.map( (counsel) => {
                            return(
                                <tr key={counsel.qnaId} className="hover-cursor counsel-row" onClick={() => detailQnA(counsel.qnaId)} title="자세히 보기">
                                    <td>{counsel.qnaCategory}</td>
                                    <td>{counsel.title}</td>
                                    <td>{counsel.createdAt}</td>
                                    <td> {counsel.existsAnswer ? "답변 완료" : "처리중"} </td>
                                </tr>
                            )
                        })
                    }
                    { (counselInput == undefined || counselInput.length ==0 ) &&
                    <tr>
                        <td className="n-table-none" colSpan={"4"}><span> 등록된 1:1 문의가 없습니다.</span></td>
                    </tr>
                    }
                </tbody>
            </table>    
            <div className="display-f flex-center pt-3 pb-5 border-b">
                <Link className="counsel-btn" to={"/mypage/cs/counsel/write"}><p> 1:1 문의하기</p></Link>
            </div>
            <BottomBar/>
        </div>
    )
}

export default Counsel