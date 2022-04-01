import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function Chatting_test () {

  const [ currentSocket, setCurrentSocket ] = useState();
  const [state, setState] = useState('')
  const [chat, setChat] =useState([])

  useEffect(() => {
    setCurrentSocket(io("http://localhost"));
  }, []);

  useEffect(() => {
    if (currentSocket) {
    currentSocket.on('onReceive', message => {
      setChat([...chat, message])
    })

    currentSocket.on('onConnect', sysMsg => {
      setChat([...chat, { msg: sysMsg }])
    })

    currentSocket.on('onDisconnect', sysMsg => {
      setChat([...chat, { msg: sysMsg }])
    })
    return () => {
      currentSocket.disconnect()
    }
  }
  }, [currentSocket])

  if (currentSocket) {
    currentSocket.on('connect', () => {
      currentSocket.emit('onJoin', {roomName: "room1", userName: 'yang'})
    })
  }

  const onTextChange = e => {
    console.log('-------1-------', e.target.value)
    setState(e.target.value)
  }

  const onMessageSubmit =(e)=>{
    e.preventDefault()
    currentSocket.emit('onSend',{
      userName: 'yang',
      msg: state,
      timestamp: new Date().toLocaleDateString()
    })
    setState('')
  }

  const renderChat =()=>{
    return chat.map((message,index)=>(
      <div key={index}>
        <h3>username:<span>{message}</span></h3>
      </div>
    ))
  }

  return (
    <div>
      {currentSocket ? (
        <div>
          <div>
            <h1>Chat log</h1>
            {renderChat()}
          </div>
          <form>
            <p>username</p>
            <p>picture</p>
            <p>created_at</p>
            <input id="input" onChange={e=> onTextChange(e)}/>
            <button onClick={onMessageSubmit}>Send</button>
          </form>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  )

//   useEffect(()=>{
//     socket.on('message',(message)=>{
//       setChat([...chat, message])
//     })
//   }, [chat])
}

export default Chatting_test;