import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_SERVER_URL } from "../../../global_variables";
import { setLogin } from "../../../redux/isValidLogin";
import apiErrorHandler from "../../../static/js/apiErrorHandler";
import customCookies from "../../../static/js/customCookies";
import BottomBar from "../../fragments/BottomBar";
import { Link, useNavigate } from "react-router-dom";

function CounselWrite(){

    const [counselType, setCounselType] = useState();
    const [userInfo, setUserInfo] = useState();
    const [counsel, setCounsel] = useState({
        name: "",
        phone: "",
        email: "",
        type: 0,
        title: "",
        body: ""
    });
    const { isValidLogin } = useSelector(state => state.isValidLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useLayoutEffect( () => {
        if(isValidLogin){
            axios.get(BACKEND_SERVER_URL + "api/v1/users",{
                headers: {
                    "X-AUTH-TOKEN": customCookies.getAccessToken(),
                    "REFRESH-TOKEN": customCookies.getRefreshToken()
                }
            })
            .then(res => {
                setUserInfo(res.data.data);
                setCounsel({
                    ...counsel,
                    "name": res.data.data.name,
                    "email": res.data.data.email,
                    "phone": res.data.data.phone
                })
            })
            .catch(error => {
                const result = apiErrorHandler(error.response.status, error.response.data);
                if(result =="logOut"){
                    customCookies.logOut();
                    dispatch(setLogin(false));         
                }
            });

            axios.get(BACKEND_SERVER_URL + "api/v1/qna/category")
            .then(res => {
                setCounselType(res.data.data);
            })

        }else{
            alert("로그인이 필요한 서비스입니다.");
            return (<Navigate replace to="/login/login" />)
        }
    }, [])

    const handleInput = (e) =>{
        const {name, value} = e.target;
        setCounsel({
            ...counsel,
            [name]: value
        })
    }

    const selectHandleInput = () => {
        const select = document.getElementById("typeSelect");
        const selectValue = select.options[select.selectedIndex].value;

        setCounsel({
            ...counsel,
            "type": selectValue
        })
    }

    const formAction = (e) => {
        e.preventDefault();

        if ( counsel.phone == "" || counsel.title == "" || counsel.body == "" || counsel.type ==0 ) {
            alert("내용이 비었거나 카테고리가 선택되지 않았습니다.");
            return;
        }

        axios.post(BACKEND_SERVER_URL + "api/v1/qna", {
            "name": counsel.name,
            "email": counsel.email,
            "phone": counsel.phone,
            "title": counsel.title,
            "body": counsel.body,
            "qnaCategoryId": counsel.type
        },{
            headers: {
                "X-AUTH-TOKEN": customCookies.getAccessToken(),
                "REFRESH-TOKEN": customCookies.getRefreshToken()
            }
        })
        .then(res =>{
            alert("문의가 등록되었습니다. 답변까지 1~2일 소요됩니다.");
            navigate("/mypage/cs/counsel");
        })

    }

    return(
        <div className="main-page-container ml-3">
            <p className="product-title border-b" > 1:1 문의하기 </p>
            
            <div className="my-4 ">
                <p className="notice-item">1:1 Q&A</p>
                <ul className="pl-3 ml-2">
                    <li className='find-pw-txt color-red' style={{fontWeight: "bold"}} >제품 사용, 오염, 전용 박스 손상, 라벨 제거, 사은품 및 부속 사용/분실 시, 교환/환불이 불가능 합니다.</li>
                    <li className='find-pw-txt color-red'style={{fontWeight: "bold"}} >교환을 원하시는 상품(사이즈)의 재고가 부족 시, 교환이 불가합니다.</li>
                    <li className='find-pw-txt'>고객님의 주문내역을 선택, 질문이 필요한 상품을 선택하시면 1:1상담이 가능합니다.</li>
                    <li className='find-pw-txt'>주문취소/교환/환불은 마이페이지>주문내역에서 신청하실 수 있습니다.</li>
                    <li className='find-pw-txt'>1:1문의 처리 내역은 마이페이지>1:1문의를 통해 확인하실 수 있습니다.</li>
                    <li className='find-pw-txt'>상품 정보(사이즈, 실측, 예상 배송일 등) 관련 문의는 해당 상품 문의에 남기셔야 빠른 답변이 가능합니다.</li>
                </ul>
            </div>

            <div className="border-b">
                <form className="counsel-form my-5 ml-3" onSubmit={formAction}>
                    <p className="counsel-txt pb-2 border-b"> 문의 작성 </p>

                    <ul className="counsel-ul">
                        <li>
                            <p className="first">문의 유형</p>
                            <select id="typeSelect" className="second counsel-select" onChange={selectHandleInput}>
                                <option name="type" value="0"> 문의 유형 선택 </option>
                                {counselType &&
                                    counselType.map( (type) => {
                                        return(
                                            <option key={type.qnaId} value={type.qnaId}>{type.qnaTitle}</option>
                                        )                                        
                                    })
                                }
                            </select>
                        </li>
                        <li>
                            <p className="first"> 작성자 </p>
                            <input type="text" className="second" name="name" defaultValue={userInfo ? userInfo.name : ""} onChange={handleInput}/>
                        </li>
                        <li>
                            <p className="first"> 휴대전화</p>
                            <input type="text" className="second" name="phone" defaultValue={userInfo ? userInfo.phone : ""} onChange={handleInput}/>
                        </li>
                        <li>
                            <p className="first"> 이메일</p>
                            <input type="text" className="second" name="email" defaultValue={userInfo ? userInfo.email : ""} onChange={handleInput}/>
                        </li>
                        <li>
                            <p className="first"> 제목</p>
                            <input type="text" className="second" name="title" onChange={handleInput}/>
                        </li>
                        <li style={{height: "120px"}}>
                            <p className="first"> 문의내용</p>
                            <textarea className="second" name="body" style={{height: "100px"}}  onChange={handleInput}/>
                        </li>
                    </ul>

                    <div className="display-f flex-center">
                    <Link to="/mypage/cs/counsel"><p  className="counsel-btn"> 취소 </p></Link>
                    <input className="counsel-btn ml-2" type="submit" value="작성하기" />
                    </div>
                </form>
            </div>
            <BottomBar/>
        </div>
    )
}

export default CounselWrite