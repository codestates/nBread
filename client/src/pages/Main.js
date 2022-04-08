import React, { useRef, useEffect , useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { axiosLogin } from '../redux/user/action';
import { axiosLogout } from '../redux/user/action';
import Navbar from '../component/Navbar'
import styled from 'styled-components'
import PostList from '../component/PostList';
import PostingWrite from "../modal/PostingWrite";
import Chatting from "../modal/Chatting";
import Map from "../component/Map";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'



const { kakao } = window;


function Main() {
  const post = useSelector((state)=> state.postsReducer.posts)
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state)=> state.loginReducer)
  const [PostingWriteModal, setPostingWriteModal] = useState(false);
  const [ChattingModal, setChattingModal] = useState(false);

  const isAuthenticated = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/auth`,{withCredentials: true})
    .then(response => {
      console.log(response.data,'res')
      if (!response.data.success) {
        // dispatch(axiosLogin())
        dispatch(axiosLogout())
      }
    })
    .catch(err => console.log("주 에러 : ",err))
  };

  //토큰
  // useEffect(() => {
  //   isAuthenticated()
  // }, []);


  //글쓰기
  const openModalPostingWrite = () => {
    if(!userInfo.isLogIn){
      Swal.fire({
        title: '로그인이 필요합니다',
        width: 500,
        padding: '1.5em',
        confirmButtonColor: '#B51D29',
        color: 'black',
        background: '#fff ',
        backdrop: ` 
          rgba(0,0,0,0.4)
        `
      })
      setPostingWriteModal(false)
    }else{
      setPostingWriteModal(!PostingWriteModal);
    }
  }
  //채팅
  const openModalChatting = () => {
    if(!userInfo.isLogIn){
      Swal.fire({
        title: '로그인이 필요합니다',
        width: 500,
        padding: '1.5em',
        confirmButtonColor: '#B51D29',
        color: 'black',
        background: '#fff ',
        backdrop: ` 
          rgba(0,0,0,0.4)
        `
      })
      setChattingModal(false)
    }else{
      setChattingModal(!ChattingModal)
    }
  }

  const [searchAddress, SetSearchAddress] = useState();
  const [mainSearchAddressCenter, SetMainSearchAddressCenter] = useState();

  const SearchMap = () => {
    const ps = new kakao.maps.services.Places()
    
    const placesSearchCB = function(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
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
    }
  }

  const [writingAddress, SetWritingAddress] = useState({
    lat: 37.49676871972202, 
    lng: 127.02474726969814 ,
  });

  const handleWritingAddress = (e) => {
    SetWritingAddress(e)
  }

  const [openPost, setOpenPost] = useState(false);

  const openPostList = () => {
    setOpenPost(!openPost)
  }

  const closePostList = () => {
    setOpenPost(false)
  }

  useEffect(()=>{
    isAuthenticated()
    window.addEventListener('resize', closePostList);
    return () => {
      window.addEventListener('resize', closePostList);
    }
  },[])


  return (
    <div>
      <Navbar/>
      <Wrapper>
        <PostListDiv openPost={openPost}>
          <PostList setOpenPost={setOpenPost} openPost={openPost} />
        </PostListDiv>
        <MapDiv openPost={openPost}>
          <Map writingAddress={writingAddress} mainSearchAddressCenter={mainSearchAddressCenter}/>
        </MapDiv>
        <SearchDiv openPost={openPost}>
          <SearchInputDiv placeholder='주소 검색' onChange={handleSearchAddress} onKeyPress={onKeyPress}></SearchInputDiv>
          {/* <SearchBtnDiv onClick={SearchMap} >검색</SearchBtnDiv> */}
          <SearchBtnDiv onClick={SearchMap} >
            <svg xmlns="http://www.w3.org/2000/svg" 
              width="22" height="22" 
              viewBox="0 0 24 24">
              <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 
              1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 
              0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 
              0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 
              3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 
              6.877c-3.793 0-6.877-3.085-6.877-6.877z"/>
            </svg>
          </SearchBtnDiv>
        </SearchDiv>
        {/* 글쓰기 버튼 */}
        <WritingButton openPost={openPost} onClick={openModalPostingWrite}>글쓰기</WritingButton>
        {/* 채팅 버튼 */}
        <ChattingButton openPost={openPost} onClick={openModalChatting}>채팅</ChattingButton>
        {post 
        ? <MobileButton openPost={openPost} onClick={openPostList}>배달 목록 {post.length}개 </MobileButton>
        : <MobileButton openPost={openPost} onClick={openPostList}> 지도를 더 확대 해 주세요 </MobileButton>
        }
      </Wrapper>

      {/* 글쓰기 Modal */}
      {PostingWriteModal === true ?<PostingWrite handleWritingAddress={handleWritingAddress} PostingWriteModal={PostingWriteModal} openModalPostingWrite={openModalPostingWrite}></PostingWrite>:null}

      {/* 채팅 Modal */}
      {ChattingModal === true ?
      <Chatting setChattingModal={setChattingModal}>
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
width: 400px;
height: calc(100vh - 100px);
overFlow : auto;
@media (max-width: 576px) {
  display: ${props => props.openPost ? 'block' : 'none'};
  width: 100vw;
  height: calc(100vh - 80px);
}  
`;

const MapDiv = styled.div`
float: left;
margin-right: -400px;
padding-right: 400px;
background-color: #B7CADB;
width: 100%;
/* height: 100vh; */
height: calc(100vh - 100px);
@media (max-width: 576px) {
  display: ${props => props.openPost ? 'none' : 'block'};
  visibility: visible;
  margin-right: 0px;
  padding-right: 0px;
  
}  
`;

const WritingButton = styled.button`
font-family: var(--main-font);
font-size: 16px;
display: ${props => props.openPost ? 'none' : 'block'};
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
@media (max-width: 576px) {
  font-size: 14px;
  width: 70px;
  height: 70px;
  bottom: 140px;
} 
`;

const ChattingButton = styled.button`
font-family: var(--main-font);
font-size: 16px;
display: ${props => props.openPost ? 'none' : 'block'};
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
@media (max-width: 576px) {
  font-size: 14px;
  width: 70px;
  height: 70px;
}  
`;

const SearchDiv = styled.div`
  display: ${props => props.openPost ? 'none' : 'block'};
  position: fixed;
  right: 16px;
  top: 130px;
  z-index: 1;
  width: 150px;
  height: 30px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  @media (max-width: 576px) {
    top: 105px;
  }  
`
const SearchInputDiv = styled.input`
  border: none;
  position: fixed;
  width: 100px;
  height: 25px;
  top: 133px;
  right: 50px;
  z-index: 1;
  &:focus {
    outline: none;    
  }
  @media (max-width: 576px) {
    top: 108px;
  }  
`

const SearchBtnDiv = styled.div`
  margin-left: 10px;
  position: fixed;
  top: 133px;
  right: 20px;
  z-index: 1;
  @media (max-width: 576px) {
    top: 108px;
  }  
`

const MobileButton = styled.button`
  font-family: var(--main-font);  
  display: none;
  font-size: 16px;
@media (max-width: 576px) {
  display: ${props => props.openPost ? 'none' : 'block'};
  bottom: 0px;
  right: 0px;
  z-index: 1;
  position: fixed;
  border: none;
  background-color: #B51D29;
  color: white;
  width: 100%;
  height: 50px;
}  
`

export default Main;
