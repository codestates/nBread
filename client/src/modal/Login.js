import styled from 'styled-components';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosLogin } from '../redux/user/action';
import SignUp from "./SignUp";
import PWConfirm from "./PWConfirm";


function Login({setLoginModal,handleSignupModal,handleCloseSignupModal}) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state)=> state.loginReducer.isLogIn)
  const LoginModal = useSelector((state)=> state.loginReducer.LoginModal)
  // console.log('login',isLogin)

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('');

  // //회원가입 모달
  // const [SignUpModal, setSignUpModal] = useState(false);


  const handleCloseLoginModal = () => {
    setLoginModal(false)

  }


    

  //비밀번호찾기 모달
  const [PWConfirmModal, setPWConfirmModal] = useState(false);

  //비밀번호찾기 모달
  const openModalPWConfirm = () => {
  setPWConfirmModal(!PWConfirmModal)
  }

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value })
  }

  const handleLogin = () => {
    const { userId, password } = loginInfo;
    // console.log(userId)
    // console.log(password)

    if (userId === '' || password === '') {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
    }else{
      dispatch(axiosLogin(loginInfo))
      setLoginModal(false)
      alert('로그인')
      // window.location.replace("/") 
    }
  }

  return (
    <>
    <ModalBackdrop onClick={handleCloseLoginModal}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <LoginForm onSubmit={(e) => e.preventDefault()}>
        <LoginTitle>로그인      
        <span onClick={handleCloseLoginModal}>&times;</span>
        </LoginTitle>
        <InputFieldDiv>
          <InputField type='text' placeholder="아이디" onChange={handleInputValue('username')} />
          <Err></Err>
          <InputField type='password' placeholder="비밀번호" onChange={handleInputValue('password')} />
        </InputFieldDiv>
          <Err>{errorMessage}</Err>
          <LoginButton  onClick={handleLogin} type='submit'>로그인</LoginButton>
          <LoginButton type='submit'>카카오 로그인</LoginButton>
            <SignUpButton onClick={handleSignupModal} handleCloseSignupModal={handleCloseSignupModal} setLoginModal={setLoginModal}>회원가입</SignUpButton>
            <PassWorldCheck onClick={openModalPWConfirm}>비밀번호찾기</PassWorldCheck>
        </LoginForm>
      </Wrapper>
      {/* 회원가입 모달 */}
      {/* {SignUpModal === true ? <SignUp openModalSignUp={openModalSignUp}></SignUp>:null} */}
      {}
      {/* 비밀번호찾기 모달 */}
      {PWConfirmModal === true ? <PWConfirm openModalPWConfirm={openModalPWConfirm}></PWConfirm>:null}
    </ModalBackdrop>
  </>
  );
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
text-align: center;
/* width: 320px;
height: 568px; */
width: 375px;
height: 667px;
display: flex;
justify-content: center;
background-color: #D2D1D1;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;
const LoginTitle = styled.div`
font-size: 28px;
margin-top: 25px;
margin-bottom: 25px;
`;
const LoginForm = styled.form`


`;

const InputFieldDiv = styled.div`

`;


const InputField = styled.input`
display: flex;
flex-direction: column;
width: 295px;
height: 56px;
font-size: 18px;
margin-top: 15px;
margin: 0 auto;
`;

const LoginButton = styled.button`
width: 295px;
height: 56px;
background-color: #B51D29;
color: white;
border: none;
margin-top: 30px;
font-size: 18px;
`;


const Err = styled.div`
font-size: 14px;
color: red;
margin-top: 2px;
`;

const SignUpButton = styled.div`
margin-top: 20px;
font-size: 14px;
color: gray;
`;

const PassWorldCheck = styled.div`
margin-top: 20px;
font-size: 14px;
color: gray;
`;
export default Login;