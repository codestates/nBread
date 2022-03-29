import React, { useRef, useEffect , useState} from "react";
import styled from 'styled-components';
import logo from '../icons/ban_logo.png';
import Login from "../modal/Login";
import LoginUser from "../component/LoginUser";
import { useDispatch, useSelector } from 'react-redux';


function Navbar() {
  const isLogin = useSelector((state)=> state.loginReducer.isLogIn)


  //로그인 모달
  const [LoginModal, setLoginModal] = useState(false);
  // //로그인 상태일때
  // const [isLogin, setIsLogin] = useState(false);

   //로그인 모달
  const openModalLogin = () => {
    setLoginModal(!LoginModal);
  }


  
  const Wrapper = styled.div`
    height: 120px;
    background-color: #D2D1D1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
  `;

  const Logo = styled.img`

  `; 

  const LoginText = styled.div`
    margin-right: 2em;
  `; 
  return (
    <>
      <Wrapper>
        <Logo src={logo}/>
      {isLogin ? <LoginUser>로그아웃</LoginUser>:<LoginText onClick={openModalLogin} LoginModal={LoginModal}>로그인</LoginText>}
      </Wrapper>
      {LoginModal === true ? <Login openModalLogin={openModalLogin}></Login>:null}
    </>
  );
}

export default Navbar;