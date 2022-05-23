import React from "react";
import { Link } from 'react-router-dom'

function BottomBar () {

    return(
        <>
        <div className='main-container pl-0 mt-4'>
            <div className='addressBox'>
                <p className="notice-item address-p mb-2"> 유신사 편집팀 </p>
                <p className="notice-item address-p"> 전라북도 전주시 덕진구 금암동 14-12 </p>
                <p className="notice-item address-p"> 이스턴 원룸 202호 </p>                
            </div>

            <div className='pl-4 pr-4 addressBox border-l'>
                <p className="notice-item address-p mb-2"> 유신사 스토어 </p>
                <p className="notice-item address-p"> 전라북도 전주시 덕진구 금암동 14-12 </p>
                <p className="notice-item address-p"> 이스턴 원룸 202호 </p>                
            </div>

            <div className='addressBox pl-4 border-l'>
                <p className="notice-item address-p mb-2"> 고객센터 </p>
                <p className="notice-item address-p"> 010-5525-6096 | 1:1 문의 | 이메일 </p>
                <p className="notice-item address-p"> 평일 오전 9시 ~ 오후 6시 </p>                
                <p className="notice-item address-p"> 평일 오전 9시 ~ 오후 6시 </p>                
            </div>
        </div> 

        <div className='main-container pl-0 mt-4'>
            <div>
                <p className="notice-item title-p"> 100% AUTHENTIC </p>
                <p className="notice-item item-p"> 무신사스토어에서 판매되는 모든 브랜드 제품은 정식제조, 정식수입원을 통해 유통되는 100% 정품임을 보증합니다. </p>                
            </div>
        </div> 
</>
    )
}

export default BottomBar