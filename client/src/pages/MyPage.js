import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom';
//회원탈퇴 테스트
import { useDispatch, useSelector } from 'react-redux';
import { axiosUserDelete } from '../redux/user/action';
import { axiosUserEdit } from '../redux/user/action';
import { useLocation } from 'react-router';
import DaumPostcode from 'react-daum-postcode';
import MyPagePost from '../component/MyPagePost';
import ProfileImage from '../component/ProfileImage';

const { kakao } = window;

function MyPage() {
//프로필사진
  const [Images, setImages] = useState(null)

//주소
  const [visible, setVisible] = useState(false); 


//회원탈퇴 테스트
  const dispatch = useDispatch();
  const isLogin = useSelector((state)=> state.loginReducer)
  // console.log('isLogin',isLogin)
  const location = useLocation()

  const history = useHistory();
  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/;
  const passwordRegExp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,16}$/;
  const phonNumberRegExp = /^[0-9]{10,11}$/;


  const [settingUserinfo, setSettingUserinfo] = useState({
    nickname: '',
    phonNumber: '',
    address: '',
    password: '',
    passwordCheck: ''
  })
  const [message, setMessage] = useState({
    nicknameMessage: '',
    phonNumberMessage: '',
    passwordMessage: '',
    passwordCheckMessage: ''
  })

  const [validation, setValidation] = useState({
    nicknameValidation: false,
    phonNumberValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false
  })

  const [changeInfoBtn, setChangeInfoBtn] = useState(false);
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

    if (key === 'phonNumber') {
      if (e.target.value.length < 10 || e.target.value.length > 11 || !phonNumberRegExp.test(e.target.value)) {
        setMessage({ ...message, phonNumberMessage: '"-" 하이픈 없이 번호만 입력해주세요.'})
        setValidation({ ...validation, phonNumberValidation: true})
      } else {
        setValidation({ ...validation, phonNumberValidation: false})
        setMessage({ ...message, phonNumberMessage: ''})
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

const handleUserEdit = () => {
    if (
    settingUserinfo.nickname === ''
    ){
      setChangeInfoBtn(!changeInfoBtn)
    }else{
      dispatch(axiosUserEdit(settingUserinfo))
      alert('수정완료')
      setChangeInfoBtn(!changeInfoBtn)
    }
}

//회원탈퇴 테스트 
  const handleUserDelete = () => {  
    alert('회원탈퇴 하시겠습니까? 회원정보가 삭제됩니다.')
    dispatch(axiosUserDelete())
    alert('회원탈퇴되었습니다.')
    history.push("/")
    isLogin(false)
    
  }
    // 주소 검색 api
    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = ''; 
      
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
      }
      setSettingUserinfo({ ...settingUserinfo, address : fullAddress})
      setVisible(false)
    }
      // 글쓰기창에서 주소 검색시 경도 위도 찾아오기
    const newSearchAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    let callback = function(result, status) {
      if (status === 'OK') {
        const newAddSearch = result[0]
        setSettingUserinfo({ ...settingUserinfo, lat: newAddSearch.y, lng: newAddSearch.x})
      }
    };
    // console.log('writeInfo',writeInfo)
    geocoder.addressSearch(`${settingUserinfo.address}`, callback);
  }
  // console.log(settingUserinfo)


    //프로필사진
    const updateImages = (newImages) => {
      setImages(newImages)
    }

  return (
    <div>
      <Navbar/>
      <Wrapper>
        <PostListDiv>
          <MyPagePost/>
        </PostListDiv>
        
        <MapDiv>
          <MyPageDiv>
            {/* 프로필사진 */}
          <ProfileImage updateImages={updateImages}/>
      {/* --------------------------회원정보 수정------------------------- */}
      {changeInfoBtn ? (
        // 회원정보 수정중인 상태
        <MyPageForm onSubmit={(e) => e.preventDefault()}>
        <InputTitle>닉네임</InputTitle>
        <InputField defaultValue={isLogin.data.nickname} onChange={settingOnChange('nickname')}/>
        {settingUserinfo.nickname.length > 0 && validation.nicknameValidation ? <Err>{message.nicknameMessage}</Err> : null}
        <InputTitle>전화번호</InputTitle>
        <InputField defaultValue={isLogin.data.phonNumber} onChange={settingOnChange('phonNumber')}/>
        {settingUserinfo.phonNumber.length > 0 && validation.phonNumberValidation ? <Err>{message.phonNumberMessage}</Err> : null}
        <InputTitle>주소</InputTitle>
        
        


        {visible? 
              <>
                <CloseBtn onClick={() => setVisible(false)} >닫기</CloseBtn> 
                <DaumPostcode 
                  onComplete={handleComplete}
                  onSuccess={newSearchAddress}
                  style={addressStyle}
                  height={700}
                  />
              </>
            : null
            }

            {settingUserinfo.address === '' ? 
              <AddressInputDiv onClick={() => setVisible(true)} >
                주소를 검색 해주세요
              </AddressInputDiv>
            : <AddressInputDiv onClick={() => setVisible(true)} onChange={settingOnChange('address')} >
                {settingUserinfo.address}
              </AddressInputDiv>
            }

        <InputTitle>비밀번호</InputTitle>
        <InputField type='password' onChange={settingOnChange('password')}/>
        {settingUserinfo.password.length > 0 && validation.passwordValidation ? <Err>{message.passwordMessage}</Err> : null}
        <InputTitle>비밀번호확인</InputTitle>
        <InputField type='password' onChange={settingOnChange('passwordCheck')}/>
        {settingUserinfo.passwordCheck.length > 0 && validation.passwordCheckValidation ? <Err>{message.passwordCheckMessage}</Err> : null}
        <SignUpToLogin onClick={handleUserDelete}>회원탈퇴</SignUpToLogin>
        <EditButton onClick={handleUserEdit}>수정완료</EditButton>
        </MyPageForm>
      ) : (
        // 기존의 회원정보
        <MyPageForm onSubmit={(e) => e.preventDefault()}>
        <InputTitle>닉네임</InputTitle>
        <Div>{isLogin.data.nickname}</Div>
        <InputTitle>전화번호</InputTitle>
        <Div>{isLogin.data.phonNumber}</Div>
        <InputTitle>주소</InputTitle>
        <Div>{isLogin.data.address}</Div>
        <InputTitle>비밀번호</InputTitle>
        <InputFieldPassWord/>
        <InputTitle>비밀번호확인</InputTitle>
        <InputFieldPassWord/>
        <SignUpToLogin onClick={handleUserDelete}>회원탈퇴</SignUpToLogin>
        <EditButton onClick={handleUserEdit}>수정하기</EditButton>
        </MyPageForm>
      )}
      
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
/* background-color: #EEEEEE; */
width: 400px;
height: calc(100vh - 120px);
overFlow : auto;
`;

const MapDiv = styled.div`
float: left;
margin-right: -460px;
padding-right: 460px;
background-color: #B7CADB;
width: 100%;
height: calc(100vh - 120px);
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

const InputFieldPassWord = styled.div`
display: flex;
flex-direction: column;
width: 250px;
height: 56px;
font-size: 18px;
margin-top: 10px;
border: solid #E2E2E2 1px;
`;


const Div = styled.div`
width: 500px;
height: 56px;
font-size: 16px;
color: #525252;
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


//주소
const CloseBtn = styled.button`
display: block;
position: absolute;
top: 52px;
right: 25px;
z-index: 100;
padding: 7px;
width: 100px;
color: white;
background-color: #A3A3A3;
border: none;
`;

const AddressInputDiv = styled.div`
background-color: white;
display: flex;
align-items: center;
width: 500px;
height: 56px;
font-size: 18px;
margin: 0 auto;
margin-top: 20px;
border: 1px gray solid;
color: gray;
`;

// 주소 api css
const addressStyle = {
  display: 'block',
  position: 'absolute',
  top: '32%',
  left: '42%',
  zIndex: '100',
  padding: '7px',
  width: '45%',
  height: '60%'
}
export default MyPage;