import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Button, Card, CardGroup, Container} from 'react-bootstrap'
import styled from 'styled-components';
import RenderJson from '../components/RenderJson';

const FindFriends = () => {
  const [notFriends, setNotFriends] = useState([])

  useEffect(()=>{
    getNotFriends();
  },[]);

  const getNotFriends = async () =>{
    try {
      let response = await axios.get('/api/users')
      setNotFriends(response.data)
    } catch (err) {
      alert('error getting Not Friends')
    }
  };

  const sample = () => {
    if(notFriends.length){
      const index =  Math.floor(Math.random() * notFriends.length)
      return notFriends[index];
    }
    return null;
  };

  const uniqueSamples = () => {
    let uniqueSample = [...new Set([sample(), sample(), sample()])]
    return uniqueSample
  };

  const addFriend= async (id)=>{
    try {
      await axios.put(`/api/users/${id}`)
      removeUser(id)
    } catch (err) {
      alert("unable to add friend")
    }
  };

  const removeUser = (id) => {
    const filteredUsers=notFriends.filter((user) => user.id !== id)
    setNotFriends(filteredUsers)
  };

  const renderUser = () => {
    let user = sample();
    if(!user){
      return<p>no new friends available</p>
    }
    return (
      <Card 
        className = "text-center mx-1"
        bg = "secondary"
        text = "light"
      >
        <Card.Header>
          <Card.Img variant = "top" src={user.image} />
        </Card.Header>
        <Card.Body>
          <Card.Title>{user.nickname}</Card.Title>
          <Card.Text>{user.email} {' '}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <SpacedButton onClick = {()=>addFriend(user.id)}>Add Friend</SpacedButton>
          <SpacedButton onClick = {()=>removeUser(user.id)}>No Thanks</SpacedButton>
        </Card.Footer>
      </Card>
    )
  };

  return(
    <Container>
      <h1>Meet New Peeps!</h1>
      <CardGroup>
        {renderUser()}
        {renderUser()}
        {renderUser()}
      </CardGroup>
    </Container>
  )
};

export const SpacedButton = styled(Button)`
  margin: 10px;
`

export default FindFriends;