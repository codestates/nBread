import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChattingDetail from "../component/ChattingDetail";
import io from 'socket.io-client';

const socket = io.connect('http://localhost');


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

  useEffect( () => {
    if (data) {
      // rooms 정보(roomName, roomUser) 받기
      socket.emit('joinServer', (data.nickname));
      socket.on('myRoomList', ({ userRoom, userNickName }) => {
        console.log('---------1----------',userRoom)
        console.log('---------1----------',userNickName)
        if (userNickName === data.nickname) {
          setRoomList(userRoom);
        }
      });
    }
  }, []);
  console.log('roomList',roomList)

  const [newRoomName, setNewRoomName] = useState([]);

  const handleChatList = (e, newRoomName) => {
    setNewRoomName(newRoomName)
    setClick(true)
  }



  return (
    <>
    <ModalBackdrop onClick={closeChattingModal}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <LoginForm onSubmit={(e) => e.preventDefault()}>
        <LoginTitle>채팅 <span onClick={closeChattingModal}>&times;</span></LoginTitle>
      
      {!click 
      ? roomList.map( (el, index) => {
        return (
        <ChattingWrapper key={index} onClick={(e)=>handleChatList(e, newRoomName)}>
          <ChattingListImg src={null}/>
            <ChattingListTextWrapper>
                <ChattingListText>{el}</ChattingListText>
            </ChattingListTextWrapper>
        </ChattingWrapper> 
        )
      })
      : <ChattingDetail newRoomName={newRoomName} click={click} setClick={setClick} setChattingModal={setChattingModal}/>
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

const Wrapper = styled.div`
    text-align: center;
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
    border-radius: 30px;
    /* @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }   */
  `;
const LoginTitle = styled.div`
font-size: 28px;
margin-top: 25px;
margin-bottom: 20px;
`;
const LoginForm = styled.form`


`;
const ChattingWrapper = styled.div`
width: 365px;
height: 98px;
background-color: #FFFFFF;
border: 1px solid #A3A3A3;
display: flex;
border-radius: 6px;
`;

const ChattingListImg = styled.img`
width: 50px;
height: 50px;
background-color: #D2D1D1;
border-radius: 50%;
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

const ChattingContents = styled.div`
width: 200px;
padding: 15px;
border-radius:10px ;
background-color: #D5B483;
`

const InputField = styled.input`
width: 350px;
height: 56px;
font-size: 18px;
margin-top: 25px;
`;

const Button = styled.button`

`

// const ChattingListTextWrapper = styled.div`
// padding-top: 23px;
// padding-left: 7px;
// `


const ChattingSendDiv = styled.div`
width: 375px;
height: 111px;
background-color: #ffffff;;
border-radius: 0px 0 30px 30px;
border: 1px solid #A3A3A3;
margin-top: -1px;
`


// {roomList.map( ({ roomName }, index) => {
//   return (
//   <ChattingWrapper key={index}>
//     <ChattingListImg src={null}/>
//       <ChattingListTextWrapper>
//           <ChattingListText>{roomName}</ChattingListText>
//       </ChattingListTextWrapper>
//   </ChattingWrapper> 
//   )
// })}
export default Chatting;