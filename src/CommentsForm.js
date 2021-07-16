import React from 'react'
import { useState,useEffect} from 'react'
import {Comment} from 'antd'

const CommentsForm = ({postId}) => {
    const [comments, setComments] = useState([]);
    const [useEffectInvoker, setUseEffectInvoker] = useState(true);
    
    useEffect(() => {
        console.log("comments, postId = ",postId)
        console.log(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, { method: 'get' })
			.then((response) => response.json())
			.then((parsedComments) => {
				setComments(parsedComments);
			});
            // console.log("comments loaded", comments.map((comment) =>comment.id));
    }, [postId]);
    
    return (
        
        <div>
            
            {comments.map((comment) =>(
                <Comment
               
                author={<a>{comment.email}</a>}
              
                content={
                  
                  <p>
                    <b>{comment.name}</b><br></br>
                    {comment.body}

                  </p>
                }
              />
            ))}
            
        </div>
    )
}

export default CommentsForm
