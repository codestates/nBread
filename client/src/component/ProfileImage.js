import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { axiosProfileImageEdit } from '../redux/user/action';
import { Button } from 'antd'

function ProfileImage(props) {
  const [previewImg, setPreviewImg] = useState(null);
  const [Img, setImg] = useState(null);
  const dispatch = useDispatch();
  const isLogin = useSelector((state)=> state.loginReducer)

  console.log('isLogin',isLogin)
//이미지 미리보기
  // const handleFileInput = (e) => {
  //   const reader = new FileReader()
  //   const file = e.target.files[0];
  //   if(file){
  //     reader.readAsDataURL(e.target.files[0])
  //   }
  //   reader.onloadend = () => {
  //     const previewImgUrl = reader.result
  //     if(previewImgUrl) {
  //       setPreviewImg(previewImgUrl)
  //     }
  //   }
  //   const fileExt = file.name.split('.').pop();
  //   if(file.type !== 'image/jpeg' || fileExt !=='jpeg'){
  //     alert('jpeg 파일만 Upload 가능합니다.');
  //     return;
  //   }
  // }
  //이미지 삭제

  const deleteImg = () => {
    setPreviewImg(null)
  }
  //이미지적용
  const handleFileUpload = (files) => {
    console.log(files[0],'33333')
    let formData = new FormData();

    const config = {
      header: {'content-type': 'multipart/form-data'},
      withCredentials: true
    }
    formData.append("file", files[0])
    console.log('44444444',formData)

    axios.post(`${process.env.REACT_APP_API_URL}/users/picture`, formData, config)
      .then(response => {
        if(response.data.success) {
          alert('파일저장성공')
          setImg(response.data.filePath)
          console.log(Img,'88888888888888')
          props.updateImages(response.data.filePath)
          dispatch(axiosProfileImageEdit(response.data.filePath))
        }else {
          alert ('파일저장실패')
        }
      })
  }
console.log(isLogin,'picturepicturepicture')
  return (
    <div>
        <MyPageProfileDiv>
          <Dropzone onDrop={handleFileUpload}>
          {({getRootProps, getInputProps}) => (
              <MyProfile {...getRootProps()}>
                <input {...getInputProps()} />
                <FrofileImg src={isLogin.picture ? isLogin.picture : "img/basic.png" }/>
              </MyProfile>
            )}
          </Dropzone>
          {/* <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}> */}

{/* {
  Img ? 
  <div>
    <img style={{minWidth: '300px', height: '240px'}}
      src={Img} alt="되라1"
    />
  </div>
  :
  <div>
  <img style={{minWidth: '300px', height: '240px'}}
    src="img/abcd.png" alt="되라2"
  />
</div>
} */}

{/* </div > */}



            <ButtonDiv>
            <ImageLabel center htmlFor="img">파일선택
            {/* <InputHidden id="img" accept="image/*" type="file" onChange={handleFileUpload}/> */}
            </ImageLabel>
            
            <Button onClick={deleteImg}>삭제</Button>
            {/* <ImageDiv><MyProfileButton onClick={handleFileUpload}>사진적용하기</MyProfileButton></ImageDiv> */}
            {/* <MyProfileName>{null}</MyProfileName> */}
            </ButtonDiv>
          </MyPageProfileDiv>
    </div>
  );
}


//마이페이지 프로필사진 Div
const MyPageProfileDiv = styled.div`
float: left;
margin-bottom: 30px;
background-color: #ffffff;
width: 100%;
height: 150px;
`;

//마이페이지 프로필사진
const MyProfile = styled.div`
float: left;
background-color: #737373;
border-radius: 50%;
border: none;
width: 100px;
height: 100px;
position: relative;
top: 25%;
left: 3%;
color: white;
text-align: center;
`;

const FrofileImg = styled.img`
background-color: #efefef;
width: 100%;
height: 100%;
border-radius: 50%;
`;

const ImageLabel = styled.label`
width: 100px;
height: 106px;
font-size: 16px;
background-color:#FFFFFF;
border: 1px solid #C9C9C9;
padding: 15px;
/* z-index: 99; */
text-align: center;
`;

const InputHidden = styled.input`
color: #999; 
display: none;
`;

const ImageDiv = styled.div`

`;

const ButtonDiv = styled.div`
margin-top: 100px;
margin-left: 120px;
`

//마이페이지 닉네임
const MyProfileButton = styled.button`
margin-left: 10px;
`;

//마이페이지 닉네임
const MyProfileName = styled.div`

`;
export default ProfileImage;

