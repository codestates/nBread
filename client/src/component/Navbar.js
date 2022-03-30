import React, { useRef, useEffect , useState} from "react";
import styled from 'styled-components';
import logo from '../icons/ban_logo.png';
import Login from "../modal/Login";
import SignUp from "../modal/SignUp";
import LoginUser from "../component/LoginUser";
import { useDispatch, useSelector } from 'react-redux';


function Navbar() {
  const isLogin = useSelector((state)=> state.loginReducer.isLogIn)
  const [LoginModal, setLoginModal] = useState(false);
  const [SignUpModal, setSignUpModal] = useState(false);


  const handleLoginModal = () => {
    setSignUpModal(false)
    setLoginModal(true);
  }

  const handleSignupModal = () => {
    setSignUpModal(!SignUpModal);
    setLoginModal(!LoginModal);
    }

  const handleCloseSignupModal = () => {
    setSignUpModal(false);
    };
  
    
  return (
    <>
      <Wrapper>
        <Logo src={logo}/>
      {isLogin ? <LoginUser setLoginModal={setLoginModal}>로그아웃</LoginUser>:<LoginText onClick={handleLoginModal}>로그인</LoginText>}
      </Wrapper>


      {LoginModal ? <Login setLoginModal={setLoginModal} handleSignupModal={handleSignupModal}></Login>:null}

      {SignUpModal ? <SignUp handleCloseSignupModal={handleCloseSignupModal} handleLoginModal={handleLoginModal}></SignUp>:null}
    </>
  );
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

export default Navbar;