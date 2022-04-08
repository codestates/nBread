import React, { useRef, useEffect , useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../icons/nBread7.jpg';
import Login from "../modal/Login";
import SignUp from "../modal/SignUp";
import LoginUser from "../component/LoginUser";
import PWConfirm from "../modal/PWConfirm";
import { useDispatch, useSelector } from 'react-redux';


function Navbar() {
  const history = useHistory();
  const isLogin = useSelector((state)=> state.loginReducer.isLogIn)
  const [LoginModal, setLoginModal] = useState(false);
  const [SignUpModal, setSignUpModal] = useState(false);
  const [PWConfirmModal, setPWConfirmModal] = useState(false);


  const handleLoginModal = () => {
    setSignUpModal(false)
    setLoginModal(true);
  }

  const handleSignupModal = () => {
    setSignUpModal(!SignUpModal);
    setLoginModal(!LoginModal);
    }

  const handlePWConfirmModal = () => {
    setPWConfirmModal(true);
    setLoginModal(false);
  }

  const handleCloseSignupModal = () => {
    setSignUpModal(false);
    };

  const handleClosePWConfirm = () => {
    setPWConfirmModal(false);
  }
  
  const handleMainPage = () => {
    history.push("/")
  }
  return (
    <>
    
      <Wrapper>
        <Logo src={logo} onClick={handleMainPage}/>
      {isLogin ? <LoginUser setLoginModal={setLoginModal}>로그아웃</LoginUser>:<LoginText onClick={handleLoginModal}>로그인</LoginText>}
      </Wrapper>


      {LoginModal ? <Login setLoginModal={setLoginModal} handleSignupModal={handleSignupModal} handlePWConfirmModal={handlePWConfirmModal}></Login>:null}

      {SignUpModal ? <SignUp handleCloseSignupModal={handleCloseSignupModal} handleLoginModal={handleLoginModal} setLoginModal={setLoginModal}></SignUp>:null}

      {PWConfirmModal ? <PWConfirm handleClosePWConfirm={handleClosePWConfirm} handleLoginModal={handleLoginModal} setLoginModal={setLoginModal}></PWConfirm>:null}
    
    </>
  );
}

const Wrapper = styled.div`
height: 100px;
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: space-between;
z-index: 1;

@media (max-width: 576px) {
  height: 80px;
} 
`;

const Logo = styled.img`
width: 80px;
margin-top: 10px;
margin-left: 20px;
@media (max-width: 576px) {
  width: 60px;
} 
`; 

const LoginText = styled.div`
margin-right: 2em;
`; 

// const Div = styled.div`
// position: fixed;
// width: 100%;
// `; 

export default Navbar;