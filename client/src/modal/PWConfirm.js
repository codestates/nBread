import React from 'react';
import styled from 'styled-components';

function PWConfirm() {
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

  return (
    <>
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <LoginForm>
      <LoginTitle>로그인      
      {/* <svg xmlns="http://www.w3.org/2000/svg" 
          width="24" height="24" viewBox="0 0 24 24">
          <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 
          8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 
          8.203-8.192 8.18 8.192z"/></svg> */}
      {/* <span onClick={openLoginModal} >&times;</span> 이렇게openLoginModal을 실행시키고 싶은데 
      props를 내려받아야해서 */}
      <span>&times;</span>
      </LoginTitle>
      <InputFieldDiv>
        <InputField placeholder="아이디"/>
        <Err>아이디가 맞지 않습니다</Err>
        <InputField placeholder="비밀번호"/>
        <Err>아이디가 맞지 않습니다</Err>
        </InputFieldDiv>
        <LoginButton>로그인</LoginButton>
        <LoginButton>카카오 로그인</LoginButton>
        <SignUp>회원가입</SignUp>
        <PassWorldCheck>비밀번호찾기</PassWorldCheck>
        
      </LoginForm>
    </Wrapper>
    </>
  );
}

export default PWConfirm;