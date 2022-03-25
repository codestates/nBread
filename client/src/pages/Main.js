import React, { useRef, useEffect , useState} from "react";
import Navbar from '../component/Navbar'
import styled from 'styled-components'
import PostList from '../component/PostList';
import PostDetail from "../component/PostDetail";
import PostingWrite from "../modal/PostingWrite";
import Chatting from "../modal/Chatting";


const options = {
  //지도 생성 기본 옵션
  center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도 중심좌표
  level: 3, //지도 레벨(확대, 축소)
};
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

function Main() {
  
  const [PostingWriteModal, setPostingWriteModal] = useState(false);
  const [ChattingModal, setChattingModal] = useState(false);
  

  //글쓰기
  const openModalPostingWrite = () => {
    setPostingWriteModal(!PostingWriteModal);
  }
  //채팅
  const openModalChatting = () => {
    setChattingModal(!ChattingModal)
  }


  const MapContainer = useRef(null); //지도 영역 DOM 레퍼런스


  useEffect(() => {
    new window.kakao.maps.Map(MapContainer.current, options); //지도 생성, 객체 리턴
    return () => {};
  }, []);



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

        {/* 글쓰기 버튼 */}
        <WritingButton onClick={openModalPostingWrite}>글쓰기</WritingButton>
        {/* 채팅 버튼 */}
        <ChattingButton onClick={openModalChatting}>채팅</ChattingButton>

      </Wrapper>

      {/* 글쓰기 Modal */}
      {PostingWriteModal === true ?<PostingWrite openModalPostingWrite={openModalPostingWrite}></PostingWrite>:null}

      {/* 채팅 Modal */}
      {ChattingModal === true ?
      <Chatting onClick={(e) => e.stopPropagation()}>
      </Chatting>
      :null}      
    </div>
  );
}

export default Main;