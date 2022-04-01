import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io.connect('http://localhost');

function Test () {

  const data = useSelector((state)=> state.loginReducer.data);
  const [userList, setUserList] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [myRoomList, setMyRoomList] = useState([]);
  const [messageInfo, setMessageInfo] = useState({ nickname: '', message: '' });
  const [chatLog, setChatLog] = useState([]);
  const [roomMessageInfo, setRoomMessageInfo] = useState({ nickname: '', message: '', roomName: '' });
  const [roomChatLog, setRoomChatLog] = useState([]);

  useEffect( () => {
    if (data) {
      // 서버 접속 및 유저 nickname으로 아이디 생성
      socket.emit('joinServer', (data.nickname));
      // 유저 정보(id, nickname, userRoom) 받기
      socket.on('userList', (users) => {
        setUserList(users);
      });
      // rooms 정보(roomName, roomUser) 받기
      socket.on('roomList', (rooms) => {
        setRoomList(rooms);
      });
      // myRoomList 정보 받기
      socket.on('myRoomList', ({ userRoom, userNickName }) => {
        if (userNickName === data.nickname) {
          setMyRoomList(userRoom);
        }
      });
      // 채팅 기록 받기
      socket.on('chatLog', (log) => {
        setChatLog(log);
      });
      // room 채팅 기록 받기
      socket.on('roomChatLog', (log) => {
        console.log('------------2----------', log)
        setRoomChatLog(log);
      });
    }
  }, []);

  const handleInputValue = (value) => (e) => {
    if (value === 'roomName'){
      setRoomName(e.target.value);
    }
    if (value === 'message') {
      setMessageInfo({ nickname: data.nickname, message: e.target.value });
    }
    if (value === 'joinRoomName') {
      setRoomMessageInfo({ ...roomMessageInfo, roomName: e.target.value });
    }
    if (value === 'roomMessage') {
      setRoomMessageInfo({ ...roomMessageInfo, nickname: data.nickname, message: e.target.value });
    }
  };

  const createRoom = () => {

    let nickname = data.nickname;

    socket.emit('createRoom', ({ roomName, nickname }));
    setRoomName('');
  };

  const enterKey = (value) => (e) => {
    if (e.key === 'Enter') {
      if (value === 'roomName') {
        if (roomName.length !== 0) {
          createRoom();   
        }
      }
      if (value === 'message') {
        if (messageInfo.message.length !== 0) {
          sendMessage();
        }
      }
      if (value === 'roomMessage') {
        if (roomMessageInfo.message.length !== 0) {
          sendRoomMessage();
        }
      }
    }
  };

  const joinRoom = (e, roomName) => {

    let nickname = data.nickname;

    socket.emit('joinRoom', ({ roomName, nickname }));
  };

  const sendMessage = () => {
    socket.emit('sendMessage', (messageInfo));
    setMessageInfo({ nickname: '', message: '' });
  };

  const sendRoomMessage = () => {
    socket.emit('sendRoomMessage', (roomMessageInfo));
    setRoomMessageInfo({ ...roomMessageInfo, message: ''});
  };

  return (
    <div>
      <div>
        <h1>---------0-----------</h1>
        <h1>UserList</h1>
        {userList.map( ({ nickname }, index) => {
          return (
            <div key={index}>
              <h3>{nickname}</h3>
            </div>
          )
        })}
      </div>
      <div>
        <h1>---------1-----------</h1>
        <span>roomName : </span>
        <input onChange={handleInputValue('roomName')} value={roomName} onKeyPress={enterKey('roomName')}/>
        <button onClick={createRoom}>create room</button>
      </div>
      <div>
        <h1>---------2-----------</h1>
        <h1>RoomList</h1>
        {roomList.map( ({ roomName }, index) => {
          return (
            <div key={index}>
              <span>{roomName}</span>
              <button onClick={(e) => joinRoom(e, roomName)}>join room</button>
            </div>
          )
        })}
      </div>
      <div>
        <h1>---------3-----------</h1>
        <h1>MyRoomList</h1>
        {myRoomList.map( (el, index) => {
          return (
            <div key={index}>
              <h3>{el}</h3>
            </div>
          )
        })}
      </div>
      <div>
        <h1>---------4-----------</h1>
        <span>{data.nickname} : </span>
        <input onChange={handleInputValue('message')} value={messageInfo.message} onKeyPress={enterKey('message')} />
        <button onClick={sendMessage}>send message</button>
        <h1>All User Chatting Log</h1>
        {chatLog.map( ({ nickname, message }, index) => {
          return (
            <div key={index}>
              <h3>{nickname} : <span>{message}</span></h3>
            </div>
          )
        })}
      </div>
      <div>
        <h1>---------5-----------</h1>
        <h1>Join Room Chatting Log</h1>
        {roomChatLog.map( ({ nickname, message }, index) => {
          return (
            <div key={index}>
              <h3>{nickname} : <span>{message}</span></h3>
            </div>
          )
        })}
        <div>
          <span>RommName : </span>
          <input onChange={handleInputValue('joinRoomName')} />
        </div>
        <div>
          <span>{data.nickname} : </span>
          <input onChange={handleInputValue('roomMessage')} value={roomMessageInfo.message} onKeyPress={enterKey('roomMessage')} />
          <button onClick={sendRoomMessage}>send message</button>
        </div>
      </div>
    </div>
  )
}

export default Test;