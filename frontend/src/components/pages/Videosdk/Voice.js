import React, { useEffect, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createRoomId } from "./API";
import { MdKeyboardVoice } from "react-icons/md";
import "./Voice.css";

function VideoComponent(props) {
  const micRef = useRef(null);
  const { micStream, micOn } = useParticipant(props.participantId);

  const micEnabled = () => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  };

  useEffect(() => {
    micEnabled();
  }, [micStream, micOn]);

  return (
    <div key={props.participantId}>
      {micOn && micRef && <audio ref={micRef} autoPlay />}
    </div>
  );
}

function Controls() {
  const [isToggled, setIsToggled] = useState(false);

  const { toggleMic } = useMeeting();
  return (
    <div className="voiceContainer">
      <div
        onClick={() => {
          setIsToggled(!isToggled);
          toggleMic();
        }}
      >
        <MdKeyboardVoice className={`voiceIcon ${isToggled && "isFalse"} `} />
      </div>
    </div>
  );
}

function Container(props) {
  const [joined, setJoined] = useState(false);
  const { join } = useMeeting();
  const { participants } = useMeeting();
  const joinMeeting = () => {
    setJoined(true);
    join();
  };
  useEffect(() => {
    joinMeeting();
  }, []);

  return (
    <div className="controlContainer">
      <div>
        <Controls />
        {[...participants.keys()].map((participantId) => (
          <VideoComponent participantId={participantId} />
        ))}
      </div>
    </div>
  );
}

function Voice({ roomId }) {
  const [meetingId, setMeetingId] = useState(null);

  useEffect(() => {
    (async () => {
      await createRoomId(roomId).then((res) => {
        setMeetingId(res.roomId);
      });
    })();
  }, []);
  
  return (
    meetingId && (
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: false,
          name: "Mohamad Tahan",
        }}
        joinWithoutUserInteraction={true}
        token={authToken}
      >
        <MeetingConsumer>
          {() => <Container meetingId={meetingId} />}
        </MeetingConsumer>
      </MeetingProvider>
    )
  );
}

export default Voice;
