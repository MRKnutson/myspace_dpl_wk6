import React, { useContext } from 'react'
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import myspace_logo from '../myspace_logo.png'

const Layout = () => {
  const navigate = useNavigate();

  const {authenticated, handleLogout} = useContext(AuthContext);

  const renderUILinks =()=>{
    if(authenticated){
      return(
        <>
          <Nav.Link eventKey = "/account">Account</Nav.Link>
          <Button onClick={()=>handleLogout(navigate)}>Logout</Button>
        </>
      )
    } else {
      return(
        <>
          <Nav.Link eventKey = "/login">Login</Nav.Link>
          <Nav.Link eventKey = "/register">New User</Nav.Link>
        </>
      )
    };
  };

  const handleSelect = (eventKey) => {
    navigate(eventKey)
  };

  return(
    <>
      <Navbar expand = "md" bg = "dark" variant = "dark">
        <Container>
          <Navbar.Brand onClick = {()=>navigate("/")}>
            <img 
              src = {myspace_logo}
              height= "45"
              className="d-inline-block align-top"
              alt="Myspace logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="response-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" onSelect = {handleSelect}>
              <Nav.Link eventKey = "/">Profile</Nav.Link>
              <Nav.Link eventKey = "/friends">Friends</Nav.Link>
              <Nav.Link eventKey = "/findfriends">Find Friends</Nav.Link>
              
            </Nav>
            <Nav className="justify-content-end" onSelect = {handleSelect}>
              {renderUILinks()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;