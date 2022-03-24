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
  //모달창이 떳을때 뒷배경 어둡게
  const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
`;
  
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
      {LoginModal === true ? <ModalBackdrop onClick={openModalLogin}>
      <Login onClick={(e) => e.stopPropagation()}>
      </Login>
      </ModalBackdrop>:null}
    </>
  );
}

export default Navbar;