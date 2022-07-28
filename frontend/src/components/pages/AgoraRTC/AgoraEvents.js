import React, { useEffect, useState } from "react";
import {
  useCallEvents,
  useJoinCall,
  useCallControls,
} from "@agnostech/react-agora-ng";
import "./VoiceCall.css";
import { MdKeyboardVoice } from "react-icons/md";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AgoraEvents = () => {
	const [isToggled, setIsToggled] = useState(false);
	const {events} = useCallEvents();
	
	//array of users in this call
	const [users, setUsers] = useState([]);
	
	// join the call
	const {loading, error, localUserId} = useJoinCall({
		channel: 'remote',  
		userId: null,  
		token: "00651f779f5682141f7b835504c65cd312aIABqAcPbILBoLBx5AtNnepxU5FZkpHkUW0nHrXNPKNJIfrJ/tloAAAAAEABUJOp9s9HjYgEAAQCz0eNi",  
		localVideoDiv: 'test'
	});

	const { toggleVideo, 
		toggleAudio, 
		leave, 
		startScreenShare, 
		stopScreenShare
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
		  // check Agora docs for all the supported evebts.
		}  
   }, [events, setUsers])


return (  
  <div className="App">
   <span>
        <MdKeyboardVoice
          className={`voiceIcon ${isToggled && " isFalse"} `}
          onClick={() => {
            setIsToggled(!isToggled);
            toggleAudio();
          }}
        />
      </span>
	

		  {users.map(user => (  
			  <div key={user.uid.toString()} id={user.uid.toString()}>  
				  {/* {user.videoTrack && user.videoTrack.play(user.uid.toString())} */}
				  {user.audioTrack && user.audioTrack.play()}
			  </div>  
		  ))}  
	  
  </div>
);
		  }
export default AgoraEvents;
