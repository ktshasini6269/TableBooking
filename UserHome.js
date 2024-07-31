import React, { useState, useEffect, useContext } from 'react'
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import BookTable from './customer/BookTable';
import AllBookings from './AllBookings';
import AddTable from './organization/AddTable';
import AllTables from './organization/AllTables';

const UserHome = () => {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const [basicActive, setBasicActive] = useState('');

  useEffect(() => {
    // Set the initial value of basicActive based on the user type
    if (user) {
      if (user.type === 'Organization') {
        setBasicActive('addtable');
      } else {
        setBasicActive('booktable');
      }
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleBasicClick = (val) => {
    if (user.type === 'Customer' && val === 'addtable') {
      return;
    }
    setBasicActive(val);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link to={'/adminhome'}>Book Table</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav>
              <h5 className='mx-3'>Hi {user.name}</h5>
              <Button onClick={handleLogOut} size='sm' variant='outline-danger' >Log Out</Button >
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <MDBTabs className='my-4 mb-3'>
          {user.type === 'Customer' ? (
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('booktable')} active={basicActive === 'booktable'}>
                Book Table
              </MDBTabsLink>
            </MDBTabsItem>
          ) : (
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('addtable')} active={basicActive === 'addtable'}>
                Add Table
              </MDBTabsLink>
            </MDBTabsItem>
          )}
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('allbookings')} active={basicActive === 'allbookings'}>
              Booking History
            </MDBTabsLink>
          </MDBTabsItem>


          {user.type === "Organization" ? <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('alltables')} active={basicActive === 'alltables'}>
              All Tables
            </MDBTabsLink>
          </MDBTabsItem> : <></>}

        </MDBTabs>

        {basicActive === 'booktable' && (
          <MDBTabsContent>
            <BookTable />
          </MDBTabsContent>
        )}

        {basicActive === 'addtable' && (
          <MDBTabsContent>
            <AddTable userId={user._id} />
          </MDBTabsContent>
        )}

        {basicActive === 'allbookings' && (
          <MDBTabsContent>
            <AllBookings />
          </MDBTabsContent>
        )}

        {basicActive === 'alltables' && (
          <MDBTabsContent>
            <AllTables />
          </MDBTabsContent>
        )}
      </Container >
    </>
  )
}

export default UserHome

