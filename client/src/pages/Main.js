import React, { useRef, useEffect , useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../component/Navbar'
import styled from 'styled-components'
import PostList from '../component/PostList';
import PostingWrite from "../modal/PostingWrite";
import Chatting from "../modal/Chatting";
import Map from "../component/Map";
import { locationChange } from "../redux/location/action";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'


const { kakao } = window;


function Main() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state)=> state.loginReducer)
  // console.log('userInfo',userInfo)

  const [PostingWriteModal, setPostingWriteModal] = useState(false);
  const [ChattingModal, setChattingModal] = useState(false);

  //글쓰기
  const openModalPostingWrite = () => {
    if(!userInfo.isLogIn){
      alert('로그인이 필요합니다')
      setPostingWriteModal(false)
    }else{
      setPostingWriteModal(!PostingWriteModal);
    }
  }
  //채팅
  const openModalChatting = () => {
    setChattingModal(!ChattingModal)
  }


  // ----------test-------------------
  // useEffect(()=>{
  //   userInfoNewSearchAddress()
  // },[userInfo])

  // const userInfoNewSearchAddress = () => {
  //   const geocoder = new kakao.maps.services.Geocoder();
    
  //   let callback = function(result, status) {
  //     if (status === 'OK') {
  //       const newAddSearch = result[0]
  //       const newAddSearchLng =  newAddSearch.x
  //       const newAddSearchLat =  newAddSearch.y
  //       dispatch(locationChange(newAddSearchLat, newAddSearchLng))
  //     }
  //   };
  //   {userInfo.isLogIn && geocoder.addressSearch(`${userInfo.data.address}`, callback)}
  //   // geocoder.addressSearch(`${userInfo.data.address}`, callback);
  // }



  return (
    <div>
      <Navbar/>
      <Wrapper>
        <PostListDiv>
          <PostList/>
        </PostListDiv>
        <MapDiv>
          <Map />
        </MapDiv>

        {/* 글쓰기 버튼 */}
        <WritingButton onClick={openModalPostingWrite}>글쓰기</WritingButton>
        {/* 채팅 버튼 */}
        <ChattingButton onClick={openModalChatting}>채팅</ChattingButton>

      </Wrapper>

      {/* 글쓰기 Modal */}
      {PostingWriteModal === true ?<PostingWrite PostingWriteModal={PostingWriteModal} openModalPostingWrite={openModalPostingWrite}></PostingWrite>:null}

      {/* 채팅 Modal */}
      {ChattingModal === true ?
      <Chatting onClick={(e) => e.stopPropagation()}>
      </Chatting>
      :null}      
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
export default Main;