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


  const [searchAddress, SetSearchAddress] = useState();
  const [mainSearchAddressCenter, SetMainSearchAddressCenter] = useState();

  const SearchMap = () => {
    const ps = new kakao.maps.services.Places()
    
    const placesSearchCB = function(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(status);
            console.log(data);
            const newSearch = data[0]
            SetMainSearchAddressCenter({
              center: { lat: newSearch.y, lng: newSearch.x }
            })
        }
    };
    ps.keywordSearch(`${searchAddress}`, placesSearchCB); 
  }

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value)
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      SearchMap()
      // window.location.replace('/');
    }
  }

  return (
    <div>
      <Navbar/>
      <Wrapper>
        <PostListDiv>
          <PostList/>
        </PostListDiv>
        <MapDiv>
          <Map mainSearchAddressCenter={mainSearchAddressCenter}/>
        </MapDiv>
        <SearchDiv>
          <SearchInputDiv onChange={handleSearchAddress} onKeyPress={onKeyPress}></SearchInputDiv>
          <SearchBtnDiv onClick={SearchMap} >주소검색</SearchBtnDiv>
        </SearchDiv>
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

const SearchDiv = styled.div`
  position: fixed;
  right: 16px;
  top: 230px;
  z-index: 1;
`
const SearchInputDiv = styled.input`
  position: fixed;
  right: 16px;
  z-index: 1;
`

const SearchBtnDiv = styled.button`
  position: fixed;
  right: 16px;
  z-index: 1;
`


export default Main;