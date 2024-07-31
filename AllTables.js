import axios from 'axios'
import React, {useContext, useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { UserContext } from '../../../App';

const AllTables = () => {
   const user = useContext(UserContext)
   const [allTables, setTables] = useState([])

   const getAllTables = async () => {
      try {
         const res = await axios.get(`http://localhost:8000/api/user/getalltables/${user._id}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })
         if (res.data.success) {
            setTables(res.data.data)
         }

      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getAllTables()
   }, [])
   return (
      <div>
         <MDBTable striped>
            <MDBTableHead>
               <tr>
                  <th scope='col'>Table ID</th>
                  <th scope='col'>Hotel Name</th>
                  <th scope='col'>Hotel Address</th>
                  <th scope='col'>Hotel Phone</th>
                  <th scope='col'>Table Type</th>
                  <th scope='col'>Price(per person)</th>
               </tr>
            </MDBTableHead>
            <MDBTableBody>
               {allTables && allTables.map((table) => {
                  return (
                     <tr key={table._id}>
                        <th>{table._id}</th>
                        <td>{table.hotelInfo.name}</td>
                        <td>{table.hotelAddress}</td>
                        <td>{table.hotelPhone}</td>
                        <td>{table.tableType}</td>
                        <td>{table.price}</td>
                     </tr>
                  );
               })}
            </MDBTableBody>
         </MDBTable>
         <p>we have {allTables.length} tables in the App.</p>
      </div>
   )
}

export default AllTables
