import { useState, Component, useLayoutEffect } from 'react'
import './App.css'
import Main from './components/Main'
import Topbar from './components/fragments/Topbar'
import Login from './components/login/Login'
import Product from './components/product/Product'
import Brand from './components/brand/Brand'
import Mypage from './components/mypage/Mypage'
import Cs from './components/cs/Cs'
import Category from './components/category/Category'
import NotFound from './components/NotFound'
import UserTopbar from './components/fragments/UserTopbar'
import Notice from './components/notice/Notice'
import Sidebar from './components/fragments/Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  customCookies  from './static/js/customCookies';

import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./redux/isValidLogin";

function App() {

  const dispatch = useDispatch();

  const { isValidLogin } = useSelector(state => state.isValidLogin);

  const validLogin = () => {
    dispatch(setLogin(true));
  }

  // 새로고침 시 isVaildLogin이 초기화 되므로 최상위 컴포넌트에서 로그인 여부 체크
  useLayoutEffect(() => {
    if(customCookies.existsJWT){
      validLogin();
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Topbar/>
        <UserTopbar/>
        <div className='main-container'>
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Main/>}></Route>      
            <Route path="/login/*" element={<Login/>}></Route>                      
            <Route path="/product/:id" element={<Product/>}></Route>              
            <Route path="/brand/*" element={<Brand/>}></Route>      
            <Route path="/notice/*" element={<Notice/>}></Route>              
            <Route path="/mypage/*" element={<Mypage/>}></Route>              
            <Route path="/cs/*" element={<Cs/>}></Route>                    
            <Route path="/category/*" element={<Category/>}></Route>               
            <Route path="*" element={<NotFound/>}></Route>                       
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
