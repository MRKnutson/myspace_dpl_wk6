import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { AuthContext } from '../providers/AuthProvider';

const CommentForm = (props) => {
  const auth = useContext(AuthContext)
  const [currentComment, setCurrentComment] = useState(props.comment_id ? props.comment : "")

  const handleSubmit = async (e) => {
    e.preventDefault()
    let newComment = {body: currentComment, user_id: auth.id}
    console.log("comment id: ", props.comment_id)
    console.log("user id: ", newComment)
    if(props.comment_id){
      try{
        let response = await axios.put(`/api/users/${auth.id}/comments/${props.comment_id}`, newComment)
        console.log(newComment)
        console.log(response)
        props.updateComment(response.data)
      } catch (err) {
        alert('error updating comment')
      }
    } else {
      try{
        let response = await axios.post(`/api/users/${auth.id}/comments`, newComment)
        props.newComment(response.data)
      } catch (err) {
        alert('error adding comment')
      }
    }
  };

  return(
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingTextarea2" label={props.comment_id ? "Comment" : "New Comment"}>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value = {currentComment}
          onChange = {(e)=>setCurrentComment(e.target.value)}
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <Button type='submit'>Submit</Button>
    </Form>
  )
};

export default CommentForm;
