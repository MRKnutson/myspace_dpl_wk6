import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Card, CardGroup, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RenderJson from '../components/RenderJson';
import { LinkButton, RaisedCard, SpacedButton } from '../components/Styles';
import { AuthContext } from '../providers/AuthProvider';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const { id } = useContext(AuthContext);
  
  useEffect(()=>{
    getFriends()
  },[])

  const getFriends = async () => {
    try {
      let response = await axios.get(`/api/users/${id}/my_friends`)
      setFriends(response.data)} 
    catch (err) {
      alert("error getting friends")
    }
  };

  const removeFriend = async (bye_bye_id) => {
    try {
      let response = await axios.delete(`/api/users/${bye_bye_id}`)
      let filteredFriends = friends.filter((f)=>f.id !== bye_bye_id)
      setFriends(filteredFriends);
    } catch (err) {
      alert('error removing friend')
    }
  };

  const renderFriends = () => {
    return friends.map((friend)=>{
      return(
        <RaisedCard className = "text-center mx-1 mb-2" key={friend.id} style={{maxWidth: "36rem", minWidth: '18rem'}}>
          <Card.Img variant = "top" src={friend.image} />
        <Card.Body>
          <Card.Title>{friend.nickname}</Card.Title>
          <Card.Text>
            <small className="text-muted">
              {friend.email}
            </small>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <SpacedButton>
            <LinkButton to="/friend" state = {friend}>View Profile</LinkButton>
          </SpacedButton>
          <SpacedButton onClick = {()=>removeFriend(friend.id)}>Unfriend</SpacedButton>
        </Card.Footer>
      </RaisedCard>
      )
    })
  };


  return (
    <Container>
      <h1>Friends</h1>
      <CardGroup>
        {renderFriends()}
      </CardGroup>
      <RenderJson json = {friends} />
    </Container>
  )
};

export default Friends;

