// import React, {useState, useEffect} from 'react';
// import io from 'socket.io-client';

// const socket =  io.connect('http://localhost')

// function Chatting_test () {

//   const [state, setState] = useState('')
//   const [chat,setChat] =useState([])

//   useEffect(()=>{
//     socket.on('message',(message)=>{
//       setChat([...chat, message])
//     })
//   }, [chat])

//   const onTextChange = e =>{
//     console.log('-------1-------', e.target.value)
//     setState(e.target.value)
//   }

//   const onMessageSubmit =(e)=>{
//     e.preventDefault()
//     const message =state
//     socket.emit('message',message)
//     setState('')
//   }

//   const renderChat =()=>{
//     return chat.map((message,index)=>(
//       <div key={index}>
//         <h3>username:<span>{message}</span></h3>
//       </div>
//     ))
//   }

//   return (
//     <div>
//       <div>
//         <h1>Chat log</h1>
//         {renderChat()}
//       </div>
//       <form>
//         <p>username</p>
//         <p>picture</p>
//         <p>created_at</p>
//         <input id="input" onChange={e=> onTextChange(e)}/>
//         <button onClick={onMessageSubmit}>Send</button>
//       </form>
//     </div>
    
//   );
// }

// export default Chatting_test;