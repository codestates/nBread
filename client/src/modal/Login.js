import styled from 'styled-components';
import React, {useState} from 'react';

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

const SignUp = styled.div`
margin-top: 20px;
font-size: 14px;
color: gray;
`;

const PassWorldCheck = styled.div`
margin-top: 20px;
font-size: 14px;
color: gray;
`;

function Login({openModalLogin}) {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value })

    console.log(e.target.value)
  }

  const handleLogin = () => {
    const { userId, password } = loginInfo;
    if (userId === '' || password === '') {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
    }
  }

  return (
    <>
    <ModalBackdrop onClick={openModalLogin}>
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <LoginForm onSubmit={(e) => e.preventDefault()}>
      <LoginTitle>로그인      
      <span onClick={openModalLogin}>&times;</span>
      </LoginTitle>
      <InputFieldDiv>
        <InputField type='text' placeholder="아이디" onChange={handleInputValue('username')} />
        <Err></Err>
        <InputField type='password' placeholder="비밀번호" onChange={handleInputValue('password')} />
      </InputFieldDiv>
        <Err>{errorMessage}</Err>
        
          
        <LoginButton  onClick={handleLogin} type='submit'>로그인</LoginButton>
        <LoginButton type='submit'>카카오 로그인</LoginButton>
          
        
        
          <SignUp className="bigBtn1">회원가입</SignUp>
          <PassWorldCheck>비밀번호찾기</PassWorldCheck>
        
      </LoginForm>
    </Wrapper>
    </ModalBackdrop>
  </>
  );
}

export default Login;