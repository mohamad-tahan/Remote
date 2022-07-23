import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {Badge, Avatar, Stack} from '@mui/material'
import "./RoomSocket.css";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#9904d9",
    color: "#0716e8",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1s infinite ease-in-out",
      border: "2px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function UserRoom({ username , profilePic}) {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  
  return (
    <div>
      <div>
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            
    {profilePic === "" ? 

       
<Avatar
  sx={{ bgcolor: generateColor}}
  alt={username.toUpperCase()}
  src="/broken-image.jpg"
/>
:
            <Avatar
alt={username.toUpperCase()}
src={profilePic} />
  }


          </StyledBadge>
        </Stack>
      </div>
      <span className="username">{username.toUpperCase()}</span>
    </div>
  );
}
