import React, { useState} from 'react';
import VideoChat from 'twilio-video';
import './App.css';
import { BsFillChatDotsFill } from 'react-icons/bs';

function App() {
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState('');
  const [activeusers, setActiveUsers] = useState('');
  const [room, setRoom] = useState(null);
  // const [identity, setIdentity] = useState('');

  // useEffect(() => {
  //   // Fetch a token from your server
  //   fetch('/token').then(res => res.json())
  //     .then(data => {
  //       setToken(data.token);
  //       setRoomName(data.roomName);
  //     });
  // }, []);

const handleJoinRoom = async ()=> {
    // Check if the room is full
    try {
      const data = await(await fetch(`/token`)).json()
      setToken(data.token)
      setRoomName(data.roomName)
      setActiveUsers(data.useractive)
    } catch (err) {
        console.log(err.message)
    }
    console.log(token)
    console.log(roomName)


    // if (count>2) {
    //   console.log('Cannot join room: room is full');
    //   // Leave the room
    //   setRoom(null);
    //   // Generate a new room name
    //   const newRoomName = generateRoomName();
    //   setRoomName(newRoomName);
    //   // Fetch a new token for the new room
    //   fetch(`/token`).then(res => res.json())
    //     .then(data => {
    //       setToken(data.token);
    //     });
    //   return;
    // }
  
    // Join a room
    VideoChat.connect(token, { name: roomName }).then(room => {
      setRoom(room);
      console.log(`Connected to ${roomName}`);

      // Attach media streams to the UI
      room.on('trackSubscribed', track => {
        const container = track.kind === 'video' ? document.getElementById('remote-media') : document.getElementById('local-media');
        container.appendChild(track.attach());
      });
    });
  }

  function handleLeaveRoom() {
    // Leave the room
    room.disconnect();
    setRoom(null);
  }

  // function generateRoomName() {
  //   // Code to generate a new room name, using a random number or a timestamp for example.
  //   // ...
  //   // Generate a random number
  //   const randomNumber = Math.floor(Math.random() * 1000000);
  //   // Use the random number as the new room name
  //   const newRoomName = `room-${randomNumber}`;
  //   return newRoomName;
  // }

  return (
    room ? (
        <div>
          <h1><b>MYNGL</b><BsFillChatDotsFill/></h1>
          {/* <p>Connected to {roomName}</p> */}
          <div id = "container">
          {/* <div id="local-media"></div> */}
          <div className="remote-media" id="remote-media"></div>
          </div>
          <div id="container"><button onClick={handleLeaveRoom}>Leave room</button></div>
        </div>
      ) : (
        <div>
          <h1><b>MYNGL</b><BsFillChatDotsFill/></h1>
          <h4 className = "subtitle">MEET. GREET. TREAT.</h4>
          <div id = "container">
          {/* <form action="/postuser" id="postuser" method="POST">
            <button type = "submit" form="postuser" onClick={handleJoinRoom}>Join Room</button>
          </form> */}
          <button onClick={handleJoinRoom}><b>Join Room</b></button>
          </div>
          {/* <div id="container">
          <form action="/getname" id="name" method="POST">
            <input type="text" placeholder="Name" name="firstname"/>
            <button type="submit" form="name">Submit</button>
          </form>
          </div> */}
        </div>
      )
  );
}

export default App;