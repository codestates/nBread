import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { axiosProfileImageEdit } from "../redux/user/action";
import { axiosProfileImageDelete } from "../redux/user/action";
import { Button } from "antd";
import Swal from "sweetalert2";

function ProfileImage(props) {
  const [Img, setImg] = useState(null);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.loginReducer);

  //이미지적용
  const handleFileUpload = (files) => {
    console.log(files[0], "33333");
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
      withCredentials: true,
    };
    formData.append("file", files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/users/picture`, formData, config)
      .then((response) => {
        if (response.data.success) {
          // alert('파일저장성공')
          Swal.fire({
            title: "사진변경 성공!",
            width: 500,
            padding: "3em",
            confirmButtonColor: "#B51D29",
            color: "black",
            background: "#fff ",
            backdrop: ` 
              rgba(0,0,0,0.4)
            `,
          });
          setImg(response.data.filePath);
          console.log(Img, "88888888888888");
          props.updateImages(response.data.filePath);
          dispatch(axiosProfileImageEdit(response.data.filePath));
        } else {
          Swal.fire({
            title: "사진변경 실패!",
            width: 500,
            padding: "3em",
            confirmButtonColor: "#B51D29",
            color: "black",
            background: "#fff ",
            backdrop: ` 
              rgba(0,0,0,0.4)
            `,
          });
        }
      });
  };
  //이미지삭제
  const deletImage = () => {
    // alert('삭제됩니다.')
    // dispatch(axiosProfileImageDelete())
    // alert ('삭제?')
    // setImg(null)
    Swal.fire({
      title: "삭제하시겠습니까?",
      padding: "3em",
      showCancelButton: true,
      confirmButtonColor: "#D4AA71",
      cancelButtonColor: "#B51D29",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.value) {
        dispatch(axiosProfileImageDelete());
        setImg(null);
      } else {
      }
    });
  };

  return (
    <div>
      <MyPageProfileDiv>
        {/* 사진 업로드 */}
        <Dropzone onDrop={handleFileUpload}>
          {({ getRootProps, getInputProps }) => (
            <MyProfile {...getRootProps()}>
              <input {...getInputProps()} id="input-file" />
              <FrofileImg
                src={isLogin.picture ? isLogin.picture : "img/basic2.png"}
              />
            </MyProfile>
          )}
        </Dropzone>

        <ButtonDiv>
          <ImageLabel center htmlFor="input-file">
            파일선택
          </ImageLabel>
          <ImageButton onClick={deletImage}>
            <P>삭제</P>
          </ImageButton>
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
  top: 40px;
  left: 35px;
  color: white;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 400px) {
    top: 20px;
    left: 25px;
  }
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
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #c9c9c9;
  padding: 7px;
  margin-left: 25px;
  margin-right: 5px;
  text-align: center;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 745px) {
    white-space: nowrap;
    overflow: hidden;
  }
`;

const ImageButton = styled.button`
  width: 50px;
  height: 32px;
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #c9c9c9;
  padding: 7px;
  /* text-align: center; */
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: 745px) {
    white-space: nowrap;
    overflow: hidden;
  }
`;

const InputHidden = styled.input`
  color: #999;
  display: none;
`;

const ImageDiv = styled.div``;

const ButtonDiv = styled.div`
  margin-top: 100px;
  margin-left: 120px;
  @media (max-width: 400px) {
    margin-top: 60px;
  }
`;
const P = styled.p`
  margin-top: -3px;
`;
//마이페이지 닉네임
const MyProfileButton = styled.button`
  margin-left: 10px;
`;

//마이페이지 닉네임
const MyProfileName = styled.div``;
export default ProfileImage;
