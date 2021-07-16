import React from 'react'
import {useState, useEffect} from 'react'
import { DeleteOutlined, EditOutlined, CommentOutlined  } from '@ant-design/icons';
import { Button, Modal } from 'antd'
import CommentsForm from './CommentsForm'
import PostForm from './PostForm'

const GetAllPostsView = () => {

    const [posts,setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [useEffectInvoker, setUseEffectInvoker] = useState(false);
    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    

    useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts', { method: 'get' })
			.then((response) => response.json())
			.then((parsedPosts) => {
				setPosts(parsedPosts);
			});
            console.log("posts loaded ",posts.map((post) => post.id));
	}, [useEffectInvoker]);


    const deletePost = (id) => {
        
        console.log(`https://jsonplaceholder.typicode.com/posts/${id}`);

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'delete' }).then(() => {
			
			setUseEffectInvoker(!useEffectInvoker);
		});
    }
    
    // const getPostComments = (id) => {
    //     console.log(id);
    // }

    const openCommentsModal = (post) => {
        console.log("open modal")
        setSelectedPost(post)
        setIsCommentsModalVisible(true);
      };

    const openUpdateModal = (post) => {
    console.log("open modal")
    setSelectedPost(post);
    setIsUpdateModalVisible(true);
    };

    const closeCommentsModal = () => {
        setIsCommentsModalVisible(false);
    };

    const closeUpdateModal = () => setIsUpdateModalVisible(false);

    const handleUpdateFinish = (values) => {
        console.log(values)
        console.log(`https://jsonplaceholder.typicode.com/posts/${values.id}`)
		fetch(`https://jsonplaceholder.typicode.com/posts/${values.id}`, {
			body: JSON.stringify(values),
			method: 'put',
			headers: { 'Content-type': 'application/json' }
		}).then(() => {
			closeUpdateModal();
			setUseEffectInvoker(!useEffectInvoker);
		});
	};

    return (
        <div>
            {console.log("component refresh")}
            <table id="posts" className="center">
                <thead>
                    <tr>
                        <th>user id</th>
                        <th>post id</th>
                        <th>post title</th>
                        <th>post content</th>
                        <th>actions</th>
                    </tr>
                </thead>
                {posts.map((post) =>(
                    <tbody key={post.id}>
                        <tr>
                            <td>{post.userId}</td>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            
                            <td>
                            <Button type="primary" onClick={() => openUpdateModal(post)} ghost ><EditOutlined /></Button>
                            <Button type="danger" ghost onClick={() => deletePost(post.id)}><DeleteOutlined /></Button>
                            <Button type="primary" ghost onClick={() => openCommentsModal(post)}><CommentOutlined /></Button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <Modal footer={null} visible={isUpdateModalVisible} onCancel={closeUpdateModal}>
                <h1>Edit post</h1>
                <PostForm initialValues={selectedPost} submitText='Save' onFinish={handleUpdateFinish} method="update" />
            </Modal>
                                    
        <Modal footer={null} visible={isCommentsModalVisible} onCancel={closeCommentsModal}>
            <CommentsForm postId={selectedPost ? selectedPost.id : 1}></CommentsForm>
        </Modal>
        </div>
    )
}

export default GetAllPostsView
