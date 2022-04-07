import styled from 'styled-components';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosUserSignUp } from '../redux/user/action';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import Swal from 'sweetalert2'

const { kakao } = window;

function SignUp({handleCloseSignupModal,setLoginModal}) {

  const dispatch = useDispatch();
  const SignUp = useSelector((state)=> state.loginReducer.SignUp)
  
  
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    phone_number: '',
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

    if (key === 'phone_number') {
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

  const handleOnBlurId = (e) => {
    setUserInfo({ ...userInfo, username : e.target.value })
    axios.post(`${process.env.REACT_APP_API_URL}/users/checkId`,{ username: e.target.value },{withCredentials: true})
    .then( (res) => {
      if (!usernameRegExp.test(e.target.value)) {
        setMessage({ ...message, idMessage: '4~12자의 영문 대 소문자, 숫자만 사용 가능합니다'})
        setValidation({ ...validation, idValidation: true})
      } else if(res.data.message === '이미 사용중인 아이디 입니다'){
        setMessage({ ...message, idMessage: '이미 존재하는 아이디입니다'})
        setValidation({ ...validation, idValidation: true})
      }else{
        setValidation({ ...validation, idValidation: false})
        setMessage({ ...message, idMessage: ''})
      }
    }).catch( (err) => {
      console.log(err);
    })
  }

  const handleOnBlurNickName = (e) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/checkNickname`,{ nickname: e.target.value },{withCredentials: true})
    .then( (res) => {
      if (e.target.value.length < 2 || e.target.value.length > 10 || !nicknameRegExp.test(e.target.value)) {
        setMessage({ ...message, nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다'})
        setValidation({ ...validation, nicknameValidation: true})
      } else if(res.data.message === '이미 사용중인 닉네임 입니다') {
        setMessage({ ...message, nicknameMessage: '이미 존재하는 닉네임입니다'})
        setValidation({ ...validation, nicknameValidation: true})
      }
      else {
        setValidation({ ...validation, nicknameValidation: false})
        setMessage({ ...message, nicknameMessage: ''})
      }
    }).catch( (err) => {
      console.log(err)
    }) 
  }

  const handleSignup = () => {
    const { username, password, passwordCheck, phone_number, nickname, address  } = userInfo;

    if (!username || !password || !passwordCheck || !nickname || !phone_number || !address) {
      setMessage({ ...message, errorMessage: '모든 항목은 필수입니다'})
      setValidation({ ...validation, errorValidation: true})
    } else if(message.idMessage === '이미 존재하는 아이디입니다'){
      setMessage({ ...message, errorMessage: '다시 확인 해주세요'})
    } else if(message.nicknameMessage === '이미 존재하는 닉네임입니다'){
      setMessage({ ...message, errorMessage: '다시 확인 해주세요'})
    } else if (usernameRegExp.test(username) && passwordRegExp.test(password) && 
    nicknameRegExp.test(nickname) && password === passwordCheck && 
    phonNumberRegExp.test(phone_number) && address){
      dispatch(axiosUserSignUp(userInfo))
      Swal.fire({
        title: '회원가입 완료',
        width: 500,
        padding: '1.5em',
        confirmButtonColor: '#B51D29',
        color: 'black',
        background: '#fff ',
        backdrop: ` 
          rgba(0,0,0,0.4)
        `
      })
        // alert('회원가입 완료되었습니다.')
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
      <PostSpan onClick={handleCloseSignupModal}>&times;</PostSpan>    
      </SignUpTitle>
      <InputFieldDiv>
        <InputField placeholder="아이디" onBlur={(e)=>handleOnBlurId(e)} onChange={handleInputValue('username')}/>
        {userInfo.username.length > 0 && validation.idValidation ? <Err>{message.idMessage}</Err> : null}
      </InputFieldDiv>
      <InputFieldDiv>
        <InputField type='password' placeholder="비밀번호" onChange={handleInputValue('password')}/>
        {userInfo.password.length > 0 && validation.passwordValidation ? <Err>{message.passwordMessage}</Err> : null}
      </InputFieldDiv>
      <InputFieldDiv>
        <InputField type='password' placeholder="비밀번호 확인" onChange={handleInputValue('passwordCheck')}/>
        {userInfo.passwordCheck.length > 0 && validation.passwordCheckValidation ? <Err>{message.passwordCheckMessage}</Err> : null}
      </InputFieldDiv>
      <InputFieldDiv>
        <InputField placeholder="전화번호" onChange={handleInputValue('phone_number')}/>
        {userInfo.phone_number.length > 0 && validation.phonNumberValidation ? <Err>{message.phonNumberMessage}</Err> : null}
      </InputFieldDiv>
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
            <InputFieldDiv>
            {userInfo.address === '' ? 
              <AddressInputDiv onClick={() => setVisible(true)} >
                주소를 검색 해주세요
              </AddressInputDiv>
            : <AddressInputDiv onClick={() => setVisible(true)} onChange={handleInputValue('address')} >
                {userInfo.address}
              </AddressInputDiv>
            }
            </InputFieldDiv>

        <InputFieldDiv>
        <InputField placeholder="닉네임" onBlur={(e)=>handleOnBlurNickName(e)} onChange={handleInputValue('nickname')}/>
        {userInfo.nickname.length > 0 && validation.nicknameValidation ? <Err>{message.nicknameMessage}</Err> : null}
        </InputFieldDiv>
        <Err>{message.errorMessage}</Err>
        <SignUpButton type='submit' onClick={handleSignup} setLoginModal={setLoginModal} >회원가입</SignUpButton>

        <SignUpToLogin onClick={handleLogin}>로그인으로 돌아가기</SignUpToLogin>
      </SignUpForm>
    </Wrapper>
    </ModalBackdrop>
    </>
  );
}
//모달창 뒷배경 어둡게
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

const SignUpTitle = styled.div`
font-size: 28px;
margin-top: 25px;
margin-bottom: 25px;
`;
const SignUpForm = styled.form`


`;

const PostSpan = styled.span`
position: absolute;
right: 40px;
`

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
padding-left: 5px;
&:focus {
  outline: none;
  border: 1px solid #C4C4C4 ;   
    }
`;

const SignUpButton = styled.button`
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
border-radius: 6px;
background-color: #B51D29;
border: none;
`;

const AddressInputDiv = styled.div`
background-color: #ffffff;
display: flex;
align-items: center;
width: 295px;
height: 56px;
font-size: 16px;
margin-top: 15px;
margin: 0 auto;
border:solid 1px;
border-color: #C4C4C4;
border-radius: 6px;
color: #737373;
padding-left: 5px;
`;

// 주소 api css
const addressStyle = {
  display: 'block',
  position: 'absolute',
  top: '80px',
  left: '20px',
  zIndex: '100',
  padding: '7px',
  width: '90%',
  height: '85%'
}

export default SignUp;