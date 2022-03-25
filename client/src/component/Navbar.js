import React, { useRef, useEffect , useState} from "react";
import styled from 'styled-components';
import logo from '../icons/ban_logo.png';
import Login from "../modal/Login";


function Navbar() {
  //로그인 모달
  const [LoginModal, setLoginModal] = useState(false);

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
        <LoginText onClick={openModalLogin}>로그인</LoginText>
      </Wrapper>
      {LoginModal === true ? <Login openModalLogin={openModalLogin}></Login>:null}
    </>
  );
}

export default Navbar;