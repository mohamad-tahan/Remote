export const authToken = process.env.REACT_APP_VOICE_TOKEN;
// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    permissions: ['allow_join', 'allow_mod'],
    body: JSON.stringify({ region: "sg001" }),
  });

  const { meetingId } = await res.json();
  return meetingId;
};



export async function createRoomId(rtcRoomId){
const options = {
	method: "POST",
	headers: {
		"Authorization": authToken,
		"Content-Type": "application/json",
	},
  body: JSON.stringify({ customRoomId: rtcRoomId }),
};
const url= `https://api.videosdk.live/v2/rooms`;
const response = await fetch(url, options);
const data = await response.json();
console.log("dataaaaa:  ",data);
return data;
}