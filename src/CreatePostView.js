import React from 'react';
import PostForm from './PostForm';
import { notification } from 'antd';

const CreatePostView = () => {
	const handleFinish = (values) => {
		console.log(values);
		fetch('https://jsonplaceholder.typicode.com/posts', {
			body: JSON.stringify(values),
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then(() => {
				notification.success({
					title: 'success',
					description: 'added new post: ' + values.title
				});
			})
			.catch((err) => {
				notification.error({
					title: 'error',
					description: JSON.stringify(err)
				});
			});
	};

	return (
		<>
			<h1 className='text-center m-5 font-display'>Add post</h1>
			<div style={{ margin: '1rem auto', width: '350px', maxWidth: '400px' }}>
				<PostForm onFinish={handleFinish} submitText='Add' />
			</div>
		</>
	);
};

export default CreatePostView;