import { Button, Card, Container, Form } from 'react-bootstrap'
import React, { useContext, useState } from 'react'

import { AuthContext } from '../providers/AuthProvider';
import useToggle from '../hooks/useToggle'
import { RaisedCard, SpacedButton } from '../components/Styles';
import { useNavigate } from 'react-router-dom';

const Account =  () => {
  const auth = useContext(AuthContext)
  const [email, setEmail]=useState(auth.email)
  const [password, setPassword]=useState(auth.password)
  const [nickname, setNickname]=useState(auth.nickname)
  const [image, setImage]=useState(auth.image)
  const navigate = useNavigate();
  const [showEdit, ToggleEdit] = useToggle(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({email, nickname, image})
    auth.handleUpdateUser({email, nickname, image}, navigate)
  };

  const handleDelete = (id) => {
    auth.handleDeleteAccount(navigate)
  }

  const accountForm = () => {
    return(
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" value = {email} onChange = {(e)=>setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>nickname</Form.Label>
            <Form.Control placeholder="Nickname" value={nickname} onChange= {(e)=>setNickname(e.target.value)}/>
          </Form.Group>
          <SpacedButton type ="submit">Update</SpacedButton>
          <SpacedButton onClick ={()=>{ToggleEdit()}}>Cancel</SpacedButton>
        </Form>
      </Container>
    )
  }
  

  return(
    <Container>
      <h1>Account</h1>
      <RaisedCard className = "text-center mx-1" >
        <Card.Img variant="top" src={auth.image} />
        <Card.Body>
          <Card.Title>{auth.nickname}</Card.Title>
          <Card.Text>
            {auth.email}
          </Card.Text>
        </Card.Body>
      </RaisedCard>
      {showEdit && accountForm()}
      {!showEdit && <SpacedButton onClick ={()=>{ToggleEdit()}}>Edit</SpacedButton>}
      <SpacedButton style={{background: "red"}} onClick={()=>handleDelete(auth.id)}>Delete Account</SpacedButton>
    </Container>
  )
};



export default Account;
