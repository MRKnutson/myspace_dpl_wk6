import axios from 'axios';
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import RenderJson from '../components/RenderJson';
import { AuthContext } from '../providers/AuthProvider';
import CommentForm from '../components/CommentForm';
import useToggle from '../hooks/useToggle'
import { RaisedCard, SpacedButton } from '../components/Styles';

const Home =  () => {
  const auth = useContext(AuthContext)
  const [comments, setComments] = useState([]);
  const [showEdit, ToggleEdit] = useToggle(false);

  useEffect(()=>{
    getComments()
  }, [])
  
  const getComments = async () => {
    let res = await axios.get(`/api/users/${auth.id}/comments`)
    setComments(res.data)
  }

  const updateComment = (newComment) => {
    let updatedComments = comments.map((c)=> c.id !== newComment.id ? c : newComment)
    setComments(updatedComments)
  };

  const newComment = (newComment) => {
    let newComments = [newComment, ...comments]
    setComments(newComments)
  };

  const deleteComment = async (id) => {
    try{
      let res = await axios.delete(`/api/users/${auth.id}/comments/${id}`)
      let filteredComments = comments.filter((c)=>c.id !== id)
      setComments(filteredComments)
    } catch (err) {
      alert('error deleting comment')
    }
  }

  const renderComments = () => {
    return comments.map((c)=>{
      return(
        <Card className = "text-center mx-1" key={c.id} style={{minWidth: '18rem'}}>
        <Card.Body>
          <Card.Text>
            {c.body}
          </Card.Text>
        </Card.Body>
        {showEdit && <CommentForm  updateComment={updateComment} newComment = {newComment} comment_id={c.id} comment = {c.body}/>}
        <Card.Footer>
          <SpacedButton onClick={ToggleEdit}>{showEdit ? "Cancel" : "Edit"}</SpacedButton>
          <SpacedButton onClick={()=>deleteComment(c.id)}>Delete</SpacedButton>
        </Card.Footer>
      </Card>
      )
    })
  };

  return(
    <Container>
      <h1>Profile</h1>
      <RaisedCard style ={{width: "30rem"}} className = "text-center mx-1" >
        <Card.Img variant="top" src={auth.image}/>
        <Card.Body>
          <Card.Title>{auth.nickname}</Card.Title>
          <Card.Text>
            {auth.email}
          </Card.Text>
        </Card.Body>
      </RaisedCard>
      <hr />
      <CardGroup>
          {renderComments()}
      </CardGroup>
      <hr />
      <CommentForm newComment={newComment} />
    </Container>
  )
};

export default Home;