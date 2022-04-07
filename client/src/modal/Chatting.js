import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChattingDetail from "../component/ChattingDetail";
import io from 'socket.io-client';

const socket = io.connect(`${process.env.REACT_APP_API_URL}`);

function Chatting({setChattingModal}) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state)=> state.loginReducer.isLogIn)
  const data = useSelector((state)=> state.loginReducer.data);
  const LoginModal = useSelector((state)=> state.loginReducer.LoginModal)

  const handleChattingList = () => {
  
  }

  const closeChattingModal = () => {
    setChattingModal(false)
  }
  const [roomList, setRoomList] = useState([]);
  const [click, setClick] = useState(false);
  const [newRoomName, setNewRoomName] = useState({
    chatId : '',
    chatName: ''
  });

  useEffect( () => {
    // rooms 정보(roomName, roomUser) 받기
    let nickname = data.nickname;

    socket.emit('joinServer', ({ nickname }));
    socket.on('myRoomList', ({ userRoom, userNickName }) => {
      if (userNickName === data.nickname) {
        setRoomList(userRoom);
      }
    });

    return () => {
      socket.off();
    }
  }, []);

  const handleChatList = (e, el) => {
    setNewRoomName({
      chatId: el.id,
      chatName: el.roomName
    })
    setClick(true)
  }

  return (
    <>
    <ModalBackdrop onClick={closeChattingModal}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <LoginForm onSubmit={(e) => e.preventDefault()}>
        <PostingWriteTitle>채팅      
            <PostSpan onClick={closeChattingModal}>&times;</PostSpan>
          </PostingWriteTitle>
      {
        (function ()  {
          if(roomList.length === 0){
            return (
              <PostNoneDiv>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 3.002c4.411 0 8 2.849 8 6.35 0 3.035-3.029 6.311-7.925 6.311-1.58 0-2.718-.317-3.718-.561-.966.593-1.256.813-3.006 1.373.415-1.518.362-2.182.331-3.184-.837-1.001-1.682-2.069-1.682-3.939 0-3.501 3.589-6.35 8-6.35zm0-2.002c-5.281 0-10 3.526-10 8.352 0 1.711.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.312 2.168-.391 5.252-1.258 6.649-2.115 1.181.289 2.312.421 3.382.421 5.903 0 9.925-4.038 9.925-8.313 0-4.852-4.751-8.352-10-8.352zm11.535 11.174c-.161.488-.361.961-.601 1.416 1.677 1.262 2.257 3.226.464 5.365-.021.745-.049 1.049.138 1.865-.892-.307-.979-.392-1.665-.813-2.127.519-4.265.696-6.089-.855-.562.159-1.145.278-1.74.364 1.513 1.877 4.298 2.897 7.577 2.1.914.561 2.933 1.127 4.352 1.385-.53-1.045-1.117-2.479-1.088-3.479 1.755-2.098 1.543-5.436-1.348-7.348zm-15.035-3.763c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071z"/></svg>              <PostNone> 
                채팅 목록이 없어요 
              </PostNone>
            </PostNoneDiv>
            )
          } else if (!click){
            return (
              roomList.map( (el, index) => {
                return (
                <ChattingWrapper key={index} onClick={(e)=>handleChatList(e, el)}>
                  <ChattingListImg src={`/icon/${el.categoryFood}.png`}/>
                    <ChattingListTextWrapper>
                        <ChattingListText>{el.roomName}</ChattingListText>
                    </ChattingListTextWrapper>
                </ChattingWrapper> 
                )
              })
            )
          } else if( click ){
            return (<ChattingDetail newRoomName={newRoomName} click={click} setClick={setClick} setChattingModal={setChattingModal}/>)
          } 
        }
        )()
      }

        </LoginForm>
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


const PostingWriteTitle = styled.div`
font-size: 28px;
margin-top: 25px;
margin-bottom: 25px;
`;

const PostSpan = styled.span`
position: absolute;
right: 40px;
`

const Wrapper = styled.div`
    text-align: center;
    overFlow : auto;
    /* width: 320px;
    height: 568px; */
    width: 375px;
    height: 667px;
    display: flex;
    justify-content: center;
    background-color: #F4F4F4;
    position: fixed;
    bottom: 60px;
    right: 18px;
    z-index: 1;
    border-radius: 20px;
    @media (max-width: 576px) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);   
  }  
  ::-webkit-scrollbar-thumb {
    background-color: #C9C9C9;
    border: 4px solid transparent;
    border-radius: 20px;
    background-clip: padding-box;  
  }
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track{
      background-color: rgba(0,0,0,0);
  }
  `;

const LoginForm = styled.div`

`;

const ChattingWrapper = styled.div`
width: 345px;
height: 98px;
background-color: #FFFFFF;
border: 1px solid #A3A3A3;
display: flex;
border-radius: 6px;
margin-top: 5px;
`;

const ChattingListImg = styled.img`
width: 50px;
height: 50px;
margin-top: 20px;
margin-left: 20px;
`;

const ChattingListTextWrapper = styled.div`
/* padding-left: 40px; */
`

const ChattingListText = styled.div`
margin-top: 35px;
margin-left: 20px;
`

const PostNone = styled.div`
  margin-top: 10px;
`

const PostNoneDiv = styled.div`
  transform: translate(0, 400%);
  text-align: center;
`

export default Chatting;