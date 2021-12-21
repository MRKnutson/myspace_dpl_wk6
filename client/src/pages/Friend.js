import React from 'react'
import { Card, CardGroup, Container } from 'react-bootstrap';
import { useLocation} from 'react-router-dom'
import RenderJson from '../components/RenderJson';
import { SpacedButton } from './FindFriends';

const Friend = () => {
  const location = useLocation()
  const friend = location.state

  const renderComments = () => {
    return friend.comments.map((c)=>{
      return(
        <Card className = "text-center mx-1" key={c.id} style={{width: "99%"}}>
        <Card.Body>
          <Card.Text>
            {c.body}
          </Card.Text>
        </Card.Body>
      </Card>
      )
    })
  };

  return(
    <Container fluid = "sm">
      <h1>{friend.nickname}</h1>
      <Card className = "text-center mx-1" key={friend.id} style={{Width: '80%'}}>
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
            Remove Friend?
          </SpacedButton>
        </Card.Footer>
      </Card>
        {renderComments()}
    </Container>
  )
};

export default Friend;