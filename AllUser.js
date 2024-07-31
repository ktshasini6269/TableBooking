import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const AllUser = () => {
   const [allUsers, setUsers] = useState([])

   const getAllUsers = async () => {
      try {
         const res = await axios.get('http://localhost:8000/api/admin/getallusers', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })
         if (res.data.success) {
            setUsers(res.data.data)
         }

      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getAllUsers()
   }, [])
   return (
      <div>
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th scope='col'>User ID</th>
            <th scope='col'>User Name</th>
            <th scope='col'>User Email</th>
            <th scope='col'>User Type</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {allUsers && allUsers.map((user) => {
            return (
              <tr key={user._id}>
                <th>{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
      <p>we have {allUsers.length} all users in the App.</p>
    </div>
   )
}

export default AllUser
