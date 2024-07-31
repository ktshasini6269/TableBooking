import React, { useState, useContext } from 'react'
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
import AllBookings from './AllBookings';
import AllUser from './AllUser';
import AllTables from './AllTables';

const AdminHome = () => {
  const navigate = useNavigate()
  const [basicActive, setBasicActive] = useState('allusers');
  const user = useContext(UserContext)
  if (!user) {
    return null
  }


  const handleBasicClick = (val) => {
    if (val === basicActive) {
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
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('allusers')} active={basicActive === 'allusers'}>
              All Users
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('allBookings')} active={basicActive === 'allBookings'}>
              All Bookings
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('alltables')} active={basicActive === 'alltables'}>
              All Tables
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        {basicActive === 'allusers' && (
          <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'allusers'}><AllUser /></MDBTabsPane>
          </MDBTabsContent>
        )}

        {basicActive === 'allBookings' && (
          <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'allBookings'}><AllBookings /></MDBTabsPane>
          </MDBTabsContent>
        )}

        {basicActive === 'alltables' && (
          <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'alltables'}><AllTables /></MDBTabsPane>
          </MDBTabsContent>
        )}
      </Container>
    </>
  )
}

export default AdminHome
