import styled from 'styled-components';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosUserSignUp } from '../redux/user/action';
import DaumPostcode from 'react-daum-postcode';
const { kakao } = window;

function SignUp({handleCloseSignupModal,setLoginModal}) {

  const dispatch = useDispatch();
  const SignUp = useSelector((state)=> state.loginReducer.SignUp)
  

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    phonNumber: '',
    address: '',
    nickname: ''
  })
  const [message, setMessage] = useState({
    idMessage: '',
    passwordMessage: '',
    passwordCheckMessage: '',
    phonNumberMessage: '',
    nicknameMessage: '',
    errorMessage: ''
  })
  const [validation, setValidation] = useState({
    idValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false,
    phonNumberValidation: false,
    nicknameValidation: false,
    errorValidation: false
  })

  //주소
  const [visible, setVisible] = useState(false); 

  const usernameRegExp = /^[A-Za-z0-9+]{4,12}$/; 
  const passwordRegExp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,16}$/;
  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/;
  const phonNumberRegExp = /^[0-9]{10,11}$/;
  

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value })

    if (key === 'username') {
      if (!usernameRegExp.test(e.target.value)) {
        setMessage({ ...message, idMessage: '4~12자의 영문 대 소문자, 숫자만 사용 가능합니다'})
        setValidation({ ...validation, idValidation: true})
      } else {
        setValidation({ ...validation, idValidation: false})
      }
    }

    if (key === 'password') {
      if (!passwordRegExp.test(e.target.value)) {
        setMessage({ ...message, passwordMessage: '8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다'})
        setValidation({ ...validation, passwordValidation: true})
      } else {
        setValidation({ ...validation, passwordValidation: false})
      }
    }

    if (key === 'passwordCheck') {
      if (e.target.value !== userInfo.password) {
        setMessage({ ...message, passwordCheckMessage: '비밀번호가 일치하지 않습니다'})
        setValidation({ ...validation, passwordCheckValidation: true})
      } else {
        setValidation({ ...validation, passwordCheckValidation: false})
      }
    }

    if (key === 'phonNumber') {
      if (!phonNumberRegExp.test(e.target.value)) {
        setMessage({ ...message, phonNumberMessage: '"-" 하이픈 없이 번호만 입력해주세요.'})
        setValidation({ ...validation, phonNumberValidation: true})
      } else {
        setValidation({ ...validation, phonNumberValidation: false})
      }
    }    

    if (key === 'nickname') {
      if (e.target.value.length < 2 || e.target.value.length > 10 || !nicknameRegExp.test(e.target.value)) {
        setMessage({ ...message, nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다'})
        setValidation({ ...validation, nicknameValidation: true})
      } else {
        setValidation({ ...validation, nicknameValidation: false})
      }
    }
  }

  const handleSignup = () => {
    const { username, password, passwordCheck, phonNumber, nickname, address  } = userInfo;

    if (!username || !password || !passwordCheck || !nickname || !phonNumber || !address) {
      setMessage({ ...message, errorMessage: '모든 항목은 필수입니다'})
      setValidation({ ...validation, errorValidation: true})
    }else if (usernameRegExp.test(username) && passwordRegExp.test(password) && 
    nicknameRegExp.test(nickname) && password === passwordCheck && 
    phonNumberRegExp.test(phonNumber) && address){

      dispatch(axiosUserSignUp(userInfo))
        alert('회원가입 완료되었습니다.')
        handleCloseSignupModal()
    }
  }

  const handleLogin = () => {
    setLoginModal(true);
    handleCloseSignupModal();
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
      setUserInfo({ ...userInfo, address : fullAddress})
      setVisible(false)
    }
      // 글쓰기창에서 주소 검색시 경도 위도 찾아오기
    const newSearchAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    let callback = function(result, status) {
      if (status === 'OK') {
        const newAddSearch = result[0]
        setUserInfo({ ...userInfo, lat: newAddSearch.y, lng: newAddSearch.x})
      }
    };
    // console.log('writeInfo',writeInfo)
    geocoder.addressSearch(`${userInfo.address}`, callback);
  }

  return (
    <>
    <ModalBackdrop>
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <SignUpForm onSubmit={(e) => e.preventDefault()}>
      <SignUpTitle>회원가입   
      <span onClick={handleCloseSignupModal}>&times;</span>    
      </SignUpTitle>
        <InputField placeholder="아이디" onChange={handleInputValue('username')}/>
        {userInfo.username.length > 0 && validation.idValidation ? <Err>{message.idMessage}</Err> : null}
        <InputField type='password' placeholder="비밀번호" onChange={handleInputValue('password')}/>
        {userInfo.password.length > 0 && validation.passwordValidation ? <Err>{message.passwordMessage}</Err> : null}
        <InputField type='password' placeholder="비밀번호 확인" onChange={handleInputValue('passwordCheck')}/>
        {userInfo.passwordCheck.length > 0 && validation.passwordCheckValidation ? <Err>{message.passwordCheckMessage}</Err> : null}
        <InputField placeholder="전화번호" onChange={handleInputValue('phonNumber')}/>
        {userInfo.phonNumber.length > 0 && validation.phonNumberValidation ? <Err>{message.phonNumberMessage}</Err> : null}

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

            {userInfo.address === '' ? 
              <AddressInputDiv onClick={() => setVisible(true)} >
                주소를 검색 해주세요
              </AddressInputDiv>
            : <AddressInputDiv onClick={() => setVisible(true)} onChange={handleInputValue('address')} >
                {userInfo.address}
              </AddressInputDiv>
            }



        <InputField placeholder="닉네임" onChange={handleInputValue('nickname')}/>
        {userInfo.nickname.length > 0 && validation.nicknameValidation ? <Err>{message.nicknameMessage}</Err> : null}
        <Err>{message.errorMessage}</Err>
        <SignUpButton type='submit' onClick={handleSignup} setLoginModal={setLoginModal} >회원가입</SignUpButton>

        <SignUpToLogin onClick={handleLogin}>로그인으로 돌아가기</SignUpToLogin>
      </SignUpForm>
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
const SignUpTitle = styled.div`
font-size: 28px;
margin-top: 25px;
margin-bottom: 25px;
`;
const SignUpForm = styled.form`


`;

const InputField = styled.input`
display: flex;
flex-direction: column;
width: 295px;
height: 56px;
font-size: 18px;
margin-top: 15px;
`;

const SignUpButton = styled.button`
width: 295px;
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
width: 295px;
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
  top: '75px',
  left: '20px',
  zIndex: '100',
  padding: '7px',
  width: '90%',
  height: '85%'
}

export default SignUp;