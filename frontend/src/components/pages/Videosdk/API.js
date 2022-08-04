export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJiNDgwMmM5Ny00OWJkLTQ0OWUtOGM5OC1jYjkwZGQwY2VlZmMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY1OTUyMDcxMywiZXhwIjoxNjYwMTI1NTEzfQ.LHf2F599DU18aNVbxCxacWY2HmvRzWuiv8pWAJ35Pas";
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