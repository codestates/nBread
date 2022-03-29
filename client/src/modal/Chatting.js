import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'

function Chatting() {
  //메뉴 선택
  return (
    <>
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <PostingWriteForm>
      <PostingWriteTitle>채팅 
      <span>&times;</span>
      </PostingWriteTitle>
        
      </PostingWriteForm>
    </Wrapper>
    </>
  );
}

const Menu = [
  { value: 'menu1', label: 'menu1' },
  { value: 'map으로 돌릴것', label: 'map으로 돌릴것' },
  { value: 'map으로 돌릴것', label: 'map으로 돌릴것' }
]
//모집 인원
const NumberOfRecruits = [
  { value: '1명', label: '1명' },
  { value: 'map으로 돌릴것', label: 'map으로 돌릴것' },
  { value: 'map으로 돌릴것', label: 'map으로 돌릴것' }
]

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
  top: 70%;
  left: 90%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
  width: 100vw;
  width: 100vh;
}  
`;
const PostingWriteTitle = styled.div`
  font-size: 28px;
  margin-top: 25px;
  margin-bottom: 25px;
`;
const PostingWriteForm = styled.form`

`;


export default Chatting;