import React, { useRef, useEffect , useState} from "react";
import Navbar from '../component/Navbar'
import styled from 'styled-components'
import PostList from '../component/PostList';
import PostDetail from "../component/PostDetail";

const options = {
  //지도 생성 기본 옵션
  center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도 중심좌표
  level: 3, //지도 레벨(확대, 축소)
};


function Main() {
  const MapContainer = useRef(null); //지도 영역 DOM 레퍼런스

  useEffect(() => {
    new window.kakao.maps.Map(MapContainer.current, options); //지도 생성, 객체 리턴
    return () => {};
  }, []);

  const SearchBar = styled.input`
    width: 200px;
    height: 40px;
    background-color: white;
    color: black;
    border-radius: 4px;
    border: none;
    margin-right: 10px;
    &:focus {
      outline: none;
    }
`;
    const SearchBtn = styled.button`
    width: 40px;
    height: 40px;
    background-color: #e97676;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: white;
    `;


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
    margin-right: -400px;
    padding-right: 400px;
    background-color: #B7CADB;
    width: 100%;
    height: calc(100vh - 120px);
  `;

  const WritingButton = styled.button`
    position: fixed;
    bottom: 160px;
    right: 16px;
    border-radius: 100%;
    border: none;
    width: 90px;
    height: 90px;
    background-color: #D4AA71;
    color: white;
    z-index: 1;
  `;

  const ChattingButton = styled.button`
    position: fixed;
    bottom: 60px;
    right: 16px;
    border-radius: 100%;
    border: none;
    width: 90px;
    height: 90px;
    background-color: #B51D29;
    color: white;
    z-index: 1;
  `;

  return (
    <div>
      <Navbar/>
      <Wrapper>
        <PostListDiv>
          <PostList/>
          {/* <PostDetail/> */}
        </PostListDiv>
        <MapDiv>
            <div
                className="map"
                style={{ width: "100%", height: "100%" }}
                ref={MapContainer}
              ></div>
        </MapDiv>
        <WritingButton>글쓰기</WritingButton>
        <ChattingButton>채팅</ChattingButton>
      </Wrapper>
    </div>
  );
}

export default Main;