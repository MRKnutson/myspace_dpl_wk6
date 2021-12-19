import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import RenderJson from '../components/RenderJson';
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

  return (
    <Container>
      <h1>Friends</h1>
      <RenderJson json = {friends} />
    </Container>
  )
};

export default Friends;