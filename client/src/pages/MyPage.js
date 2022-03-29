import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom';
//회원탈퇴 테스트
import { useDispatch, useSelector } from 'react-redux';
import { axiosUserDelete } from '../redux/user/action';
import { axiosUserEdit } from '../redux/user/action';
import { useLocation } from 'react-router';

function MyPage() {
//회원탈퇴 테스트
  const dispatch = useDispatch();
  const isLogin = useSelector((state)=> state.loginReducer.isLogIn)
  const location = useLocation()

  const history = useHistory();
  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/;
  const passwordRegExp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,16}$/;
  const [settingUserinfo, setSettingUserinfo] = useState({
    nickname: '',
    password: '',
    passwordCheck: ''
  })
  const [message, setMessage] = useState({
    nicknameMessage: '',
    passwordMessage: '',
    passwordCheckMessage: ''
  })

  const [validation, setValidation] = useState({
    nicknameValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false
  })
//마이페이지 회원정보 유효성검사 
  const settingOnChange = (key) => (e) => {
    setSettingUserinfo({ ...settingUserinfo, [key]: e.target.value })
    
    if (key === 'nickname') {
      if (e.target.value.length < 2 || e.target.value.length > 10 || !nicknameRegExp.test(e.target.value)) {
        setMessage({ ...message, nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다'})
        setValidation({ ...validation, nicknameValidation: true})
      } else {
        setValidation({ ...validation, nicknameValidation: false})
        setMessage({ ...message, nicknameMessage: ''})
      }
    }
    if (key === 'password') {
      
      if (!passwordRegExp.test(e.target.value)) {
        setMessage({ ...message, passwordMessage: '8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다'})
        setValidation({ ...validation, passwordValidation: true})
      } else {
        setValidation({ ...validation, passwordValidation: false})
        setMessage({ ...message, passwordMessage: ''})
      }
    }
    if (key === 'passwordCheck') {
      if (e.target.value !== settingUserinfo.password) {
        setMessage({ ...message, passwordCheckMessage: '비밀번호가 일치하지 않습니다'})
        setValidation({ ...validation, passwordCheckValidation: true})
      } else {
        setValidation({ ...validation, passwordCheckValidation: false})
        setMessage({ ...message, passwordCheckMessage: ''})
        // setPasswordBtnActive(true)
      }
    }
  }
//메인페이지로 이동 버튼
  const clickHomelBtn = () => {
    history.push("/")
  }
//회원정보 수정 버튼
const handleUserEdit = () => {
  const { nickname, password, passwordCheck } = settingUserinfo;
    if (nickname === '' || password === '' || passwordCheck === ''){
    alert('ah')
    }else{
      dispatch(axiosUserEdit(settingUserinfo))
      alert('수정완료')
      window.location.replace("/MyPage")
    }
}


//회원탈퇴 테스트 
  const handleUserDelete = () => {  
    alert('회원탈퇴 하시겠습니까? 회원정보가 삭제됩니다.')
    dispatch(axiosUserDelete())
    alert('회원탈퇴되었습니다.')
    window.location.replace("/")
  }
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
      
      <MyPageForm onSubmit={(e) => e.preventDefault()}>
        <InputTitle>닉네임</InputTitle>
        <InputField onChange={settingOnChange('nickname')}/>
        {settingUserinfo.nickname.length > 0 && validation.nicknameValidation ? <Err>{message.nicknameMessage}</Err> : null}
        <InputTitle>전화번호</InputTitle>
        <InputField/>
        
        <InputTitle>주소</InputTitle>
        <InputField/>
        <InputTitle>비밀번호</InputTitle>
        <InputField onChange={settingOnChange('password')}/>
        {settingUserinfo.password.length > 0 && validation.passwordValidation ? <Err>{message.passwordMessage}</Err> : null}
        <InputTitle>비밀번호확인</InputTitle>
        <InputField onChange={settingOnChange('passwordCheck')}/>
        {settingUserinfo.passwordCheck.length > 0 && validation.passwordCheckValidation ? <Err>{message.passwordCheckMessage}</Err> : null}
        <SignUpToLogin onClick={handleUserDelete}>회원탈퇴</SignUpToLogin>
        <EditButton onClick={handleUserEdit}>수정하기</EditButton>
      </MyPageForm>
          </MyPageDiv>
        </MapDiv>
        <HomeButton onClick={clickHomelBtn}>홈으로</HomeButton>
      </Wrapper>
    </div>
  );
}
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

export default MyPage;