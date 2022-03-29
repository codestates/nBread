import styled from 'styled-components';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosUserSignUp } from '../redux/user/action';

function SignUp({handleCloseSignupModal,setLoginModal}) {

  const dispatch = useDispatch();
  const SignUp = useSelector((state)=> state.loginReducer.SignUp)
  

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    nickname: ''
  })
  const [message, setMessage] = useState({
    idMessage: '',
    passwordMessage: '',
    passwordCheckMessage: '',
    nicknameMessage: '',
    errorMessage: ''
  })
  const [validation, setValidation] = useState({
    idValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false,
    nicknameValidation: false,
    errorValidation: false
  })



  const usernameRegExp = /^[A-Za-z0-9+]{4,12}$/; 
  const passwordRegExp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,16}$/;
  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/;

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value })

    if (key === 'username') {
      if (!usernameRegExp.test(e.target.value)) {
        setMessage({ ...message, idMessage: '4~12자의 영문 대 소문자, 숫자만 사용 가능합니다'})
        setValidation({ ...validation, idValidation: true})
      } else {
        setValidation({ ...validation, idValidation: false})
      }
    }

    if (key === 'password') {
      if (!passwordRegExp.test(e.target.value)) {
        setMessage({ ...message, passwordMessage: '8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다'})
        setValidation({ ...validation, passwordValidation: true})
      } else {
        setValidation({ ...validation, passwordValidation: false})
      }
    }

    if (key === 'passwordCheck') {
      if (e.target.value !== userInfo.password) {
        setMessage({ ...message, passwordCheckMessage: '비밀번호가 일치하지 않습니다'})
        setValidation({ ...validation, passwordCheckValidation: true})
      } else {
        setValidation({ ...validation, passwordCheckValidation: false})
      }
    }

    if (key === 'nickname') {
      if (e.target.value.length < 2 || e.target.value.length > 10 || !nicknameRegExp.test(e.target.value)) {
        setMessage({ ...message, nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다'})
        setValidation({ ...validation, nicknameValidation: true})
      } else {
        setValidation({ ...validation, nicknameValidation: false})
      }
    }
  }

  const handleSignup = () => {
    const { username, password, passwordCheck, nickname  } = userInfo;

    if (!username || !password || !passwordCheck || !nickname) {
      setMessage({ ...message, errorMessage: '모든 항목은 필수입니다'})
      setValidation({ ...validation, errorValidation: true})
    }else if (usernameRegExp.test(username) && passwordRegExp.test(password) && nicknameRegExp.test(nickname) && password === passwordCheck){
      dispatch(axiosUserSignUp(userInfo))
        alert('회원가입 완료되었습니다.')
        handleCloseSignupModal()
    }
  }

  return (
    <>
    <ModalBackdrop>
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <SignUpForm onSubmit={(e) => e.preventDefault()}>
      <SignUpTitle>회원가입   
      <span onClick={handleCloseSignupModal}>&times;</span>    
      </SignUpTitle>
        <InputField placeholder="아이디" onChange={handleInputValue('username')}/>
        {userInfo.username.length > 0 && validation.idValidation ? <Err>{message.idMessage}</Err> : null}
        <InputField placeholder="비밀번호" onChange={handleInputValue('password')}/>
        {userInfo.password.length > 0 && validation.passwordValidation ? <Err>{message.passwordMessage}</Err> : null}
        <InputField placeholder="비밀번호 확인" onChange={handleInputValue('passwordCheck')}/>
        {userInfo.passwordCheck.length > 0 && validation.passwordCheckValidation ? <Err>{message.passwordCheckMessage}</Err> : null}
        <InputField placeholder="전화번호"/>
        <InputField placeholder="닉네임" onChange={handleInputValue('nickname')}/>
        {userInfo.nickname.length > 0 && validation.nicknameValidation ? <Err>{message.nicknameMessage}</Err> : null}
        <Err>{message.errorMessage}</Err>
        <SignUpButton type='submit' onClick={handleSignup} setLoginModal={setLoginModal} >회원가입</SignUpButton>

        <SignUpToLogin>로그인으로 돌아가기</SignUpToLogin>
      </SignUpForm>
    </Wrapper>
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
const SignUpTitle = styled.div`
font-size: 28px;
margin-top: 25px;
margin-bottom: 25px;
`;
const SignUpForm = styled.form`


`;

const InputField = styled.input`
display: flex;
flex-direction: column;
width: 295px;
height: 56px;
font-size: 18px;
margin-top: 15px;
`;

const SignUpButton = styled.button`
width: 295px;
height: 56px;
background-color: #B51D29;
color: white;
border: none;
margin-top: 30px;
font-size: 18px;
`;

const SignUpToLogin = styled.div`
margin-top: 20px;
font-size: 14px;
color: gray;
`;

const Err = styled.div`
font-size: 14px;
color: red;
margin-top: 2px;
`;
export default SignUp;