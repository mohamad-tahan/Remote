import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import AdminNav from './AdminNav';
function ViewContacts() {
    const[contacts, setContacts] = useState([]);
 

    const token = localStorage.getItem("token");

    const getContacts = async () => {
        const res = await fetch("/auth/getContactUs", {
          headers: { "content-type": "application/json", token: token },
        });
        const data = await res.json();
        console.log(data);
    
        if (data) {
          setContacts(data);
          console.log(data);
        } else {
          toast.error("Something went wrong.");
        }
      };

      useEffect(() => {
        getContacts();
        }, []);




  return (
    <div>
        <AdminNav/>
<h1 className="viewUsers">Messages</h1>

    <table className="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          
        </tr>
    </thead>
    <tbody>
        {contacts.map((contact) => (
            <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.message}</td>      
            </tr>
            
        ))}
    </tbody>
    </table>



    </div>
 

  )
}

export default ViewContacts


// function ViewUsers() {

//     const[contacts, setContacts] = useState([]);
 

//     const token = localStorage.getItem("token");

//     const getContacts = async () => {
//         const res = await fetch("/auth/getUser", {
//           headers: { "content-type": "application/json", token: token },
//         });
//         const data = await res.json();
//         console.log(data);
    
//         if (data) {
//           setContacts(data);
//           console.log(data);
//         } else {
//           toast.error("Something went wrong.");
//         }
//       };

//       useEffect(() => {
//         getContacts();
//         }, []);







//   return (
//     <div>
//         <AdminNav/>
// <h1 className="viewUsers">View All Users</h1>

//     <table className="table">
//     <thead>
//         <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Message</th>
          
//         </tr>
//     </thead>
//     <tbody>
//         {/* {users.map((user) => (
//             <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.user_type}</td>
//                 <td>No</td>
//             </tr>
            
//         ))} */}
//     </tbody>
//     </table>



//     </div>
 

//   )
// }

// export default ViewUsers