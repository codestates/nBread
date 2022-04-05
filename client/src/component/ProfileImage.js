import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { axiosProfileImageEdit } from '../redux/user/action';
import { axiosProfileImageDelete } from '../redux/user/action';
import { Button } from 'antd'

function ProfileImage(props) {
  const [Img, setImg] = useState(null);
  const dispatch = useDispatch();
  const isLogin = useSelector((state)=> state.loginReducer)

  //이미지 삭제
  const deleteImg = () => {
    alert('사진을 지우겠습니까?')
  
    // dispatch(axiosProfileImageDelete())
    // alert('사진습니다.')
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
  return (
    <div>
          <MyPageProfileDiv>

          {/* 사진 업로드 */}
          <Dropzone onDrop={handleFileUpload}>
          {({getRootProps, getInputProps}) => (
              <MyProfile {...getRootProps()}>
                <input {...getInputProps()} />
                <FrofileImg src={isLogin.picture ? isLogin.picture : "img/basic.png" }/>
              </MyProfile>
            )}
          </Dropzone>

            <ButtonDiv>
            <ImageLabel center htmlFor="img">파일선택
            </ImageLabel>
            <Button onClick={deleteImg}>삭제</Button>
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

