import React from 'react';
import styled from 'styled-components';

function PWConfirm({handleClosePWConfirm,setLoginModal}) {

  const handleClose = () => {
    handleClosePWConfirm();
  }

  const handleLogin = () => {
    setLoginModal(true);
    handleClosePWConfirm();
  }
  return (
    <>
    <ModalBackdrop>
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <LoginForm onSubmit={(e) => e.preventDefault()}>
      <LoginTitle>비밀번호찾기     
      <span onClick={handleClose}>&times;</span>
      </LoginTitle>
        <InputFieldDiv>
        <InputField placeholder="아이디"/>
        </InputFieldDiv>
        <InputFieldDiv>
        <InputField placeholder="비밀번호"/>
        </InputFieldDiv>
        <Button>조회하기</Button>
        <InputField placeholder="문자로 간 코드를 입력해주세요."/>
        <Button>확인</Button>
        <SignUpToLogin onClick={handleLogin}>로그인으로 돌아가기</SignUpToLogin>
      </LoginForm>
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
background-color: #FAFAFA;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
border-radius: 30px;
`;

const LoginTitle = styled.div`
font-size: 28px;
margin-top: 25px;
margin-bottom: 25px;
`;
const LoginForm = styled.form`


`;


const InputFieldDiv = styled.div`
margin-top: 14px;
`;

const InputField = styled.input`
display: flex;
flex-direction: column;
width: 295px;
height: 56px;
font-size: 16px;
margin-top: 15px;
margin: 0 auto;
border:solid 1px;
border-color: #C4C4C4;
border-radius: 6px;
background-color: #ffffff;
&:focus {
  outline: none;
  border: 1px solid #C4C4C4 ;   
    }
`;

const Button = styled.button`
width: 295px;
height: 56px;
background-color: #B51D29;
color: white;
border: none;
border-radius: 6px;
margin-top: 30px;
font-size: 16px;
`;


const SignUpToLogin = styled.div`
margin-top: 20px;
font-size: 14px;
color: gray;
`;

export default PWConfirm;