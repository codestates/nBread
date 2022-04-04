import styled from 'styled-components';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function ChattingDetail() {
  const history = useHistory();




  return (
    <>
    <ModalBackdrop onClick={null}>
      <Wrapper onClick={(e) => e.stopPropagation()}>

        <LoginForm onSubmit={(e) => e.preventDefault()}>
        <LoginTitle>강남역에서 같이 배달비 나눌사람~</LoginTitle>
        <ChattingWrapper>
        {/* <ChattingListImg src={null}/> */}

        <ChattingListText>닉네임</ChattingListText>
              <ChattingListTextWrapper>
                <ChattingContents>배달비 4000원인데 5명이서 어떻게 나눌까요?</ChattingContents>
              </ChattingListTextWrapper>
        
        </ChattingWrapper>
        <ChattingSendDiv>
        <InputField placeholder="메세지를 입력해주세요"></InputField>
        <Button>전송</Button>
        
        </ChattingSendDiv>
        
        </LoginForm>
      </Wrapper>

      
    </ModalBackdrop>
  </>
  );
}
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
    background-color: #ffffff;
    position: fixed;
    bottom: 60px;
    right: 18px;
    z-index: 1;
    border-radius: 30px;
    border: 1px solid #737373;
    /* @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }   */
  `;

const LoginTitle = styled.div`
font-size: 18px;
margin-top: 25px;
//em, rem 으로 변경
margin-bottom: 20px;
`;

const LoginForm = styled.form`


`;


const ChattingWrapper = styled.div`
width: 375px;
height: 490px;
background-color: #F4F4F4;
border: 1px solid #A3A3A3;
display: flex;
`;

const ChattingListImg = styled.img`
width: 50px;
height: 50px;
background-color: #D2D1D1;
border-radius: 50%;
margin-top: 20px;
margin-left: 20px;
`;

const ChattingListTextWrapper = styled.div`
padding-top: 23px;
padding-left: 7px;
`

const ChattingContents = styled.div`
width: 200px;
padding: 15px;
border-radius:10px ;
background-color: #D5B483;
`

const ChattingListText = styled.div`
margin-top: 25px;
margin-left: 10px;
`

const ChattingSendDiv = styled.div`
width: 375px;
height: 111px;
background-color: #ffffff;;
border-radius: 0px 0 30px 30px;
border: 1px solid #A3A3A3;
margin-top: -1px;
`

const InputField = styled.input`
width: 350px;
height: 56px;
font-size: 18px;
margin-top: 25px;
`;

const Button = styled.button`

`
export default ChattingDetail;