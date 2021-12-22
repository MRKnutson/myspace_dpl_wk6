import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Card, CardGroup, Container} from 'react-bootstrap'
import { RaisedCard, SpacedButton } from '../components/Styles';
import { AuthContext } from '../providers/AuthProvider';

const FindFriends = () => {
  const [users, setUsers] = useState([])

  const auth = useContext(AuthContext)

  useEffect(()=>{
    uniqueSamples()
  },[auth.notFriends]);

  const sample = () => {
    if(auth.notFriends.length){
      const index =  Math.floor(Math.random() * auth.notFriends.length)
      return auth.notFriends[index];
    }
    return null;
  };

  const uniqueSamples = () => {
    let uniqueSample = [...new Set([sample(), sample(), sample(), sample(), sample(), sample()])]
    setUsers(uniqueSample.slice(0,3))
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
    const filteredUsers=auth.notFriends.filter((user) => user.id !== id)
    auth.setNotFriends(filteredUsers)
  };

  const renderUsers = () => {
    if(users.length >1 && users[0] !== null ){
    return users.map((u)=>{
      return(
        <RaisedCard 
        key = {u.id}
        className = "text-center mx-1 mb-2" 
      >
        <Card.Header>
          <Card.Img variant = "top" src={u.image} />
        </Card.Header>
        <Card.Body>
          <Card.Title>{u.nickname}</Card.Title>
          <Card.Text>{u.email} {' '}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <SpacedButton onClick = {()=>addFriend(u.id)}>Add Friend</SpacedButton>
          <SpacedButton onClick = {()=>removeUser(u.id)}>No Thanks</SpacedButton>
        </Card.Footer>
      </RaisedCard>
      )
    })}
  };

  return(
    <Container>
      <h1>Meet New Peeps!</h1>
      <CardGroup>
        {users.length>0 && users[0] !== null ? renderUsers() : <p>Unable to find new friends</p>}
      </CardGroup>
    </Container>
  )
};

export default FindFriends;