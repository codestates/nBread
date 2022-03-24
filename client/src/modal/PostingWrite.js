import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'

function PostingWrite() {
  //메뉴 선택
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

  const InputFieldDiv = styled.div`
  margin-top: 35px;
  `;


  const InputField = styled.input`
    display: flex;
    flex-direction: column;
    width: 295px;
    height: 50px;
    font-size: 18px;
    margin: 0 auto;
    margin-top: 20px;
  `;

    const InputAdress = styled.input`
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 50px;
    font-size: 18px;
    margin: 0 auto;
    margin-top: 20px;
  `;

  const SelectDiv = styled.div`
    display: flex;
  `;

  //주소와 기본주소 Div
  const AdressDiv = styled.div`
    display: flex;
`;    

  //기본주소 Div
  const AdressBasicDiv = styled.div`
`;  

  //'기본주소' 글씨
  const AdressBasic = styled.div`
  font-size: 14px;
`;

  //기본주소 체크박스
  const AdressCheck = styled.input`
  width: 35px;
  height: 35px;
`;


  const Detail = styled(InputField)`
    height: 180px;
    margin-top: 20px;
  `;

  const PostingWriteButton = styled.button`
    width: 295px;
    height: 56px;
    background-color: #B51D29;
    color: white;
    border: none;
    font-size: 18px;
    margin-top: 7%;
  `;

    


  return (
    <>
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <PostingWriteForm>
      <PostingWriteTitle>모집글작성      
      <span>&times;</span>
      </PostingWriteTitle>
      <InputFieldDiv>
        <InputField placeholder="식당이름"/>
        <SelectDiv>
        <Select options={Menu}>
          메뉴
        </Select>
        <Select options={NumberOfRecruits}>
          모집 인원
        </Select>
        </SelectDiv>

        <AdressDiv>
        <InputAdress placeholder="주소"/>
        {/* 주소입력과 기본 주소불러오기 */}
        <AdressBasicDiv>
        <AdressBasic>기본 주소</AdressBasic>
        <AdressCheck type="checkbox"></AdressCheck>
        </AdressBasicDiv>
        </AdressDiv>

        <InputField placeholder="배달료"/>
        <Detail placeholder="세부사항을 작성해주세요."/>
        </InputFieldDiv>
        <PostingWriteButton>등록하기</PostingWriteButton>
      </PostingWriteForm>
    </Wrapper>
    </>
  );
}

export default PostingWrite;