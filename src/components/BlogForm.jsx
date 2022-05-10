import { useRef } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const BlogForm = (props) => {
    const axios = require('axios');
    const baseURL = 'https://babble-tr-ijc.herokuapp.com/blog';
    const textInput = useRef();
    const titleInput = useRef();
    const imageInput = useRef();

    const newPost = () => {
        axios.post(baseURL,{
            title: titleInput.current,
            image: imageInput.current,
            text: textInput.current
        })
        .then(response=>{
            console.log(response.data);
        })
    }
    
      //axios put request
      const updatePost = () => {
        axios.put(baseURL+'/'+props.currentPost.current._id,{
            title: titleInput.current,
            image: imageInput.current,
            text: textInput.current
        })
        .then(response=>{
            console.log(response.data);
        })
    }
    
      //axios delete request
      const deletePost = () => {
          axios.delete(baseURL+'/'+props.currentPost.current._id)
      }


    return (
        <div>
               <Form>
                   <Form.Group>
                       <Form.Label>Title</Form.Label>
                       <Form.Control
                        type='text'
                        placeholder='Title'
                        defaultValue={props.currentPost.current?props.currentPost.current.title:""}
                        onChange={(e)=>titleInput.current = e.target.value}
                        required
                       />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                       <Form.Control
                        type='text'
                        placeholder='Image URL'
                        defaultValue={props.currentPost.current?props.currentPost.current.image:""}
                        onChange={(e)=>imageInput.current = e.target.value}
                        required
                       />
                       </Form.Group>
                       <Form.Group>
                        <Form.Label>Content</Form.Label>
                       <Form.Control
                        as='textarea'
                        placeholder='Text'
                        defaultValue={props.currentPost.current?props.currentPost.current.text:""}
                        onChange={(e)=>textInput.current = e.target.value}
                        required
                       />
                   </Form.Group>

                <Button type="submit" variant="primary" onClick={() => {
                    if (props.currentPost.current) {
                        updatePost();
                    } else {
                        newPost();
                    }
                    props.setPostChange(old => !old);
                    props.handleClose();
                }}>
                    Submit
                </Button>
                <Button type="submit" variant="danger" onClick={() => {
                    deletePost();
                    props.setPostChange(old => !old);
                    props.handleClose();
                }}>
                    Delete
                </Button>
               </Form>
        </div>
    )
}

export default BlogForm;