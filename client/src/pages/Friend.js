import axios from 'axios';
import React from 'react'
import { Card, Container } from 'react-bootstrap';
import { useLocation, useNavigate} from 'react-router-dom'
import { RaisedCard, SpacedButton } from '../components/Styles';

const Friend = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const friend = location.state

  const renderComments = () => {
    return friend.comments.map((c)=>{
      return(
        <RaisedCard className = "text-center mx-1 mb-2" key={c.id} >
        <Card.Body>
          <Card.Text>
            {c.body}
          </Card.Text>
        </Card.Body>
      </RaisedCard>
      )
    })
  };

  const handleFriendRemoval= async (id) =>{
    try {
      let res = await axios.delete(`/api/users/${id}`)
      navigate("/friends")
    } catch (err) {
      alert('error removing friend')
    }
  };

  return(
    <Container fluid = "sm">
      <h1>{friend.nickname}</h1>
      <RaisedCard className = "text-center mx-1 mb-2" key={friend.id} style={{Width: '80%'}}>
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
          <SpacedButton onClick = {()=>handleFriendRemoval(friend.id)}>
            Remove Friend
          </SpacedButton>
        </Card.Footer>
      </RaisedCard>
      <RaisedCard className = "text-center mx-1 mb-2"  style={{width: "99%", background: "#4946f2"}}>
        <Card.Body>
          <Card.Title style={{color: "white"}}>
            Posts
          </Card.Title>
        </Card.Body>
      </RaisedCard>
        {renderComments()}
    </Container>
  )
};

export default Friend;