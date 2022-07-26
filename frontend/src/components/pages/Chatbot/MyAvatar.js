import React from "react";
import { Avatar} from '@mui/material'



export default function MyAvatar() {
    const username  = localStorage.getItem("username");  
  return (
    <div>
     
        
<Avatar
  sx={{ bgcolor: "#0d3173"}}
  alt={username.toUpperCase()}
  src="/broken-image.jpg"
/>
    

    </div>
  );
}
