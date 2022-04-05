import styled from 'styled-components';
import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';


const socket = io.connect(`${process.env.REACT_APP_API_URL}`);


function ChattingDetail({newRoomName,click, setClick,setChattingModal}) {
  const history = useHistory();
  const data = useSelector((state)=> state.loginReducer.data);


  const closeChattingModal = () => {
    setChattingModal(false)
  }

  const handleBack = () => {
    setClick(!click)
  }

  const [roomMessageInfo, setRoomMessageInfo] = useState({ 
    nickname: data.nickname, 
    message: '', 
    roomId: newRoomName.chatId 
  });
  const [roomChatLog, setRoomChatLog] = useState([]);
  
  useEffect(()=>{
    // room 채팅 기록 받기
    let nickname = data.nickname;
    let roomId = newRoomName.chatId
    
    socket.emit('joinServer', ({ nickname, roomId }));

    socket.on('roomChatLog', (slice) => {
      setRoomChatLog(slice);
    });
    return()=>{

    }
  }, []) 

  useEffect(() => {
    let isCleanUp = true;
    let nickname = data.nickname;
    let roomId = newRoomName.chatId
    const fetchData = async() => {
      await socket.emit('joinServer', ({ nickname, roomId }));
      await socket.on('roomChatLog', (slice) => {
        setRoomChatLog(slice);
      });
    }
    if(isCleanUp){
      fetchData();
    }
    return () => isCleanUp = false;
  },[]);





  const sendRoomMessage = () => {
    socket.emit('sendRoomMessage', (roomMessageInfo));
    setRoomMessageInfo({ ...roomMessageInfo, message: ''});
  };

  const handleInputValue = (value) => (e) => {
    if (value === 'roomMessage') {
      setRoomMessageInfo({ ...roomMessageInfo, message: e.target.value});
    }
  };

  // enterKey입력시 2번 전송되는 문제 발생 + 막았는데 안막아짐
  const enterKey = (value) => (e) => {
    if (e.key === 'Enter') {
      console.log('---------enter-----------')
      if (value === 'roomMessage') {
        if (roomMessageInfo.message.length !== 0) {
          console.log('--------!0--sendRoomMessage()------')
          sendRoomMessage();
        } else {
          console.log('--------0--------')
        }
      }
    }
  };

  return (
    <>
    <ModalBackdrop onClick={closeChattingModal}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <LoginForm>
        <PostingWriteTitle>
          <PostSpan><svg onClick={handleBack} 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24"
          ><path 
            d="M16.67 0l2.83 2.829-9.339 
            9.175 9.339 9.167-2.83 
            2.829-12.17-11.996z"/>
          </svg></PostSpan>
          {newRoomName.chatName}      
        </PostingWriteTitle>

        <ChattingWrapper>
        {/* <ChattingListImg src={null}/> */}
        {roomChatLog.map( ({ nickname, message }, index) => {
          return (
            <ChattingListDiv key={index}>
              <ChattingListText>{nickname}</ChattingListText>
              <ChattingContents>{message}</ChattingContents>
            </ChattingListDiv>
          )
        })}        
        </ChattingWrapper>
        <ChattingSendDiv>
          <InputField placeholder="메세지를 입력해주세요" onChange={handleInputValue('roomMessage')} value={roomMessageInfo.message} onKeyUp={enterKey('roomMessage')} />
            {/* <InputField placeholder="메세지를 입력해주세요" onChange={handleInputValue('roomMessage')} value={roomMessageInfo.message} onKeyPress={enterKey('roomMessage')} /> */}
            <Button onClick={sendRoomMessage}>전송</Button>
        </ChattingSendDiv>
        </LoginForm>
      </Wrapper>
    </ModalBackdrop>
  </>
  );
}

const PostingWriteTitle = styled.div`
  font-size: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const PostSpan = styled.span`
  position: absolute;
  right: 330px;
`

const ChattingListDiv = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`

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
    overFlow : hidden;
    /* width: 320px;
    height: 568px; */
    width: 375px;
    height: 667px;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    position: fixed;
    bottom: 60px;
    right: 18px;
    z-index: 1;
    border-radius: 20px;
    border: 1px solid #737373;
    @media (max-width: 576px) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);   
  }  
  `;

const LoginTitle = styled.div`
font-size: 18px;
margin-top: 25px;
//em, rem 으로 변경
margin-bottom: 20px;
`;

const LoginForm = styled.div`


`;

const ChattingWrapper = styled.div`
width: 375px;
height: 490px;
background-color: #F4F4F4;
overFlow : auto;
border: 1px solid #A3A3A3;
/* display: flex; */
/* flex-direction: column; */
`;

const ChattingListImg = styled.img`
width: 50px;
height: 50px;
background-color: #D2D1D1;
border-radius: 50%;
margin-top: 20px;
margin-left: 20px;
`;

const ChattingContents = styled.div`
width: 200px;
padding: 15px;
border-radius:10px ;
background-color: #D5B483;
margin-left: 10px;
`

const ChattingListText = styled.div`
/* margin-top: 25px; */
margin-left: 10px;
`

const ChattingSendDiv = styled.div`
display: flex;
width: 375px;
height: 111px;
background-color: #ffffff;;
border-radius: 0px 0 30px 30px;
border: 1px solid #A3A3A3;
margin-top: -1px;
`

const InputField = styled.input`
width: 300px;
height: 56px;
font-size: 18px;
margin-top: 25px;
margin-left: 10px;
border-radius: 6px;
border:solid 1px #C4C4C4;
&:focus {
outline: none;
border: 1px solid #C4C4C4 ;   
  }
`;

const Button = styled.button`
margin-top: 25px;
width: 50px;
height: 56px;
margin-left: 5px;
border: none;
background-color: #D5B483;
color: white;
border-radius: 6px;
`
export default ChattingDetail;