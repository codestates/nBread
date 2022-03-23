import React from 'react'
import Navbar from '../component/Navbar'
import styled from 'styled-components'

function MyPage() {
  const Wrapper = styled.div`
    /* display: flex; */
    overflow:hidden; 
  `;
  const PostListDiv = styled.div`
    float: left;
    background-color: #EEEEEE;
    width: 460px;
    height: calc(100vh - 120px);
  `;

  const MapDiv = styled.div`
    float: left;
    margin-right: -460px;
    padding-right: 460px;
    background-color: #B7CADB;
    width: 100%;
    height: calc(100vh - 120px);
  `;
  //마이페이지 프로필사진 Div
  const MyPageProfileDiv = styled.div`
  float: left;
  margin-bottom: 30px;
  background-color: #A7CADB;
  width: 100%;
  height: 150px;
  `;
  //마이페이지 프로필사진
  const MyProfile = styled.div`
  float: left;
  background-color: #737373;
  border-radius: 100%;
  border: none;
  width: 90px;
  height: 90px;
  position: relative;
  top: 25%;
  `;

  //마이페이지 프로필사진 영역 Div
  const MyProfileDiv = styled.div`
  display: flex;
  position: relative;
  top: 50%;
  left: 1%;
  `;

  //마이페이지 닉네임
  const MyProfileName = styled.div`

  `;

  //마이페이지 닉네임
  const MyProfileButton = styled.button`
  margin-left: 10px;
  `;

  const MyPageDiv = styled.div`
  margin: auto;
  background-color: #FFFFFF;
  width: 95%;
  height: calc(100vh - 120px);
`;


  const HomeButton = styled.button`
    position: fixed;
    bottom: 60px;
    right: 16px;
    border-radius: 100%;
    border: none;
    width: 90px;
    height: 90px;
    background-color: #B51D29;
    color: white;
  `;


const SignUpTitle = styled.div`
font-size: 28px;
margin-top: 25px;
margin-bottom: 25px;
`;

const MyPageForm = styled.form`
float: left;
margin-left: 50px;
`;

const InputTitle = styled.div`
margin-top: 10px;
font-size: 18px;
`;

const InputField = styled.input`
display: flex;
flex-direction: column;
width: 500px;
height: 56px;
font-size: 18px;
margin-top: 10px;
`;

const EditButton = styled.button`
float: right;
width: 200px;
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

  return (
    <div>
      <Navbar/>
      <Wrapper>
        <PostListDiv>
          목록
        </PostListDiv>
        <MapDiv>
          
          <MyPageDiv>
          <MyPageProfileDiv>
          <MyProfile></MyProfile>
          <MyProfileDiv>
          <MyProfileName>닉네임</MyProfileName>
          <MyProfileButton>사진수정</MyProfileButton>
          <MyProfileButton>삭제</MyProfileButton>
          </MyProfileDiv>
          </MyPageProfileDiv>
      
      <MyPageForm>
        <InputTitle>닉네임</InputTitle>
        <InputField/>
        <Err>중복된 닉네임 입니다.</Err>
        <InputTitle>전화번호</InputTitle>
        <InputField/>
        
        <InputTitle>주소</InputTitle>
        <InputField/>
        <InputTitle>비밀번호</InputTitle>
        <InputField/>
        <Err>비밀번호는 1~3자리 수입니다.</Err>
        <InputTitle>비밀번호확인</InputTitle>
        <InputField/>
        <Err>비밀번호가 다릅니다.</Err>
        <SignUpToLogin>회원탈퇴</SignUpToLogin>
        <EditButton>수정하기</EditButton>
      </MyPageForm>
          </MyPageDiv>
        </MapDiv>
        <HomeButton>홈으로</HomeButton>
      </Wrapper>
    </div>
  );
}

export default MyPage;