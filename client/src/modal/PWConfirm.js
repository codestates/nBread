import React from 'react';
import styled from 'styled-components';

function PWConfirm() {


  return (
    <>
    <ModalBackdrop>
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <LoginForm onSubmit={(e) => e.preventDefault()}>
      <LoginTitle>비밀번호찾기     
      <span>&times;</span>
      </LoginTitle>
      <InputFieldDiv>
        <InputField placeholder="아이디"/>
        <InputField placeholder="비밀번호"/>
        </InputFieldDiv>
        <LoginButton>조회하기</LoginButton>
        <InputField placeholder="문자로 간 코드를 입력해주세요."/>
        <LoginButton>확인</LoginButton>
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


export default PWConfirm;