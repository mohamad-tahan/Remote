import React, {useEffect, useState} from  'react';
import {useCallEvents, useJoinCall, useCallControls} from '@agnostech/react-agora-ng';
import "./VoiceCall.css"
import { MdKeyboardVoice } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";


const AgoraEvents = () => {
	
	//register event listeners
	const {events} = useCallEvents();
	
	//array of users in this call
	const [users, setUsers] = useState([]);
	
	// join the call
	const {loading, error, localUserId} = useJoinCall({
		channel: 'remote',  
		userId: null,  
		token: "00651f779f5682141f7b835504c65cd312aIABtOgV8nLm7/5k12x29GUgy5mw4Kj8nCBMr20F4qCioDLJ/tloAAAAAEABUJOp9W6PiYgEAAQBbo+Ji",  
		localVideoDiv: 'test'
	});
	
    const {toggleVideo, 
        toggleAudio, 
      } = useCallControls();

	useEffect(() => {  
	  switch (events.event) {  
		  case "user-joined":  
			  console.log("user joined");
			  setUsers(users => [...users, events.data.remoteUser]);
			  break;  
		  case "user-published":
			  console.log("user published");
			  break;  
		  case "user-unpublished": 
			  console.log("user unpublished"); 
			  break;  
		  case "user-left":  
			  console.log('user left');  
			  setUsers(users => {  
				  const user = events.data.remoteUser;  
				  return users.filter(oldUser => oldUser.uid !== user.uid);  
			  });
			  break;
		}  
   }, [events, setUsers])


   console.log("users", users);
return (  
  <div className="voiceChat">
    <IoIosVideocam className='videoChatIcon' onClick={() => toggleVideo('test')}/>
    
      <MdKeyboardVoice  className='voiceIcon' onClick={() => toggleAudio()}/>
	
	 <div style={{height: '60%'}} id={'test'}></div>  
	 <div style={{height: '40%'}}>  
		  {users.map(user => (  
			  <div key={user.uid.toString()} style={{height: '300px', width: '300px'}} id={user.uid.toString()}>  
				  {user.videoTrack && user.videoTrack.play(user.uid.toString())}
				  {user.audioTrack && user.audioTrack.play()}
			  </div>  
		  ))}  
	 </div>  
  </div>
);
          }
export default AgoraEvents;