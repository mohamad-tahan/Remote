import React from 'react'
import {AgoraProvider} from '@agnostech/react-agora-ng';  
import AgoraRTC from "agora-rtc-sdk-ng"
import AgoraEvents from './AgoraEvents.js';


const client = AgoraRTC.createClient({mode: "rtc", codec: "vp8"});  

const VoiceCall = () => (  
    <AgoraProvider client={client} appId={'51f779f5682141f7b835504c65cd312a'}>  
       <AgoraEvents/> 
    </AgoraProvider>  
  );  


export default VoiceCall