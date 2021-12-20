import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import RenderJson from '../components/RenderJson';
import { AuthContext } from '../providers/AuthProvider';

const Home =  () => {
  const auth = useContext(AuthContext)
  const [comments, setComments] = useState([]);

  useEffect(()=>{
    getComments()
  }, [])
  
  const getComments = async () => {
    let res = await axios.get(`/api/users/${auth.id}/comments`)
    setComments(res.data)
  }

  const renderComments = () => {
    return comments.map((c)=>{
      return(
        <Card className = "text-center mx-1" key={c.id}>
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
    <Container>
      <h1>Profile</h1>
      <Card className = "text-center mx-1">
        <Card.Img variant="top" src={auth.image} />
        <Card.Body>
          <Card.Title>{auth.nickname}</Card.Title>
          <Card.Text>
            {auth.email}
          </Card.Text>
        </Card.Body>
      </Card>
      <hr />
      <Row xs={1} md={4} className="g-4">
          {renderComments()}
      </Row>
      <RenderJson json={auth} />
      <RenderJson json={comments} />
    </Container>
  )
};

export default Home;