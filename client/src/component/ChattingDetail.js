import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';


const socket = io.connect('http://localhost');


function ChattingDetail({newRoomName,click, setClick,setChattingModal}) {
  const history = useHistory();
  const data = useSelector((state)=> state.loginReducer.data);


  const closeChattingModal = () => {
    setChattingModal(false)
  }

  const handleBack = () => {
    setClick(!click)
  }
  console.log('detail',newRoomName)

  const [roomMessageInfo, setRoomMessageInfo] = useState({ nickname: data.nickname, message: '', roomName: newRoomName.chatId });
  const [roomName, setRoomName] = useState('');
  const [messageInfo, setMessageInfo] = useState({ nickname: '', message: '' });
  const [roomChatLog, setRoomChatLog] = useState([]);

  const sendRoomMessage = () => {
    socket.emit('sendRoomMessage', (roomMessageInfo));
    setRoomMessageInfo({ ...roomMessageInfo, message: ''});
  };

  const handleInputValue = (value) => (e) => {
    if (value === 'roomMessage') {
      setRoomMessageInfo({ ...roomMessageInfo, message: e.target.value});
    }
  };

  const enterKey = (value) => (e) => {
    if (e.key === 'Enter') {
      if (value === 'roomMessage') {
        if (roomMessageInfo.message.length !== 0) {
          sendRoomMessage();
        }
      }
    }
  };

  useEffect(()=>{
    // room 채팅 기록 받기
    socket.emit('joinServer', (data.nickname));
    socket.emit('sendRoomMessage', (roomMessageInfo));
    socket.on('roomChatLog', (log) => {
      console.log('------------2----------', log)
      setRoomChatLog(log);
    });
  },[])

  console.log('roomChatLog',roomChatLog)
  return (
    <>
    <ModalBackdrop onClick={closeChattingModal}>
      <Wrapper onClick={(e) => e.stopPropagation()}>

        <LoginForm onSubmit={(e) => e.preventDefault()}>
            <svg onClick={handleBack} 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24"
          ><path 
            d="M16.67 0l2.83 2.829-9.339 
            9.175 9.339 9.167-2.83 
            2.829-12.17-11.996z"/>
          </svg>
        <LoginTitle>강남역에서 같이 배달비 나눌사람~</LoginTitle>
        <ChattingWrapper>
        {/* <ChattingListImg src={null}/> */}
        {roomChatLog.map( ({ nickname, message }, index) => {
          return (
            <div key={index}>
              <ChattingListText>{nickname}</ChattingListText>
              <ChattingListTextWrapper>
                <ChattingContents>{message}</ChattingContents>
              </ChattingListTextWrapper>
              {/* <h3>{nickname} : <span>{message}</span></h3> */}
            </div>
          )
        })}
        {/* <ChattingListText>닉네임</ChattingListText>
              <ChattingListTextWrapper>
                <ChattingContents>배달비 4000원인데 5명이서 어떻게 나눌까요?</ChattingContents>
              </ChattingListTextWrapper> */}
        
        </ChattingWrapper>
        <ChattingSendDiv>
        {/* <InputField placeholder="메세지를 입력해주세요"></InputField>
        <Button>전송</Button>
         */}
          <div>
            <InputField placeholder="메세지를 입력해주세요" onChange={handleInputValue('roomMessage')} value={roomMessageInfo.message} onKeyPress={enterKey('roomMessage')} />
            <Button onClick={sendRoomMessage}>send message</Button>
          </div>
        </ChattingSendDiv>
        
        </LoginForm>

      </Wrapper>

      
    </ModalBackdrop>
  </>
  );
}
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
    background-color: #ffffff;
    position: fixed;
    bottom: 60px;
    right: 18px;
    z-index: 1;
    border-radius: 30px;
    border: 1px solid #737373;
    @media (max-width: 768px) {
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

// const LoginForm = styled.form`


// `;

const LoginForm = styled.div`


`;

const ChattingWrapper = styled.div`
width: 375px;
height: 490px;
background-color: #F4F4F4;
border: 1px solid #A3A3A3;
display: flex;
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
padding-top: 23px;
padding-left: 7px;
`

const ChattingContents = styled.div`
width: 200px;
padding: 15px;
border-radius:10px ;
background-color: #D5B483;
`

const ChattingListText = styled.div`
margin-top: 25px;
margin-left: 10px;
`

const ChattingSendDiv = styled.div`
width: 375px;
height: 111px;
background-color: #ffffff;;
border-radius: 0px 0 30px 30px;
border: 1px solid #A3A3A3;
margin-top: -1px;
`

const InputField = styled.input`
width: 350px;
height: 56px;
font-size: 18px;
margin-top: 25px;
`;

const Button = styled.button`

`
export default ChattingDetail;