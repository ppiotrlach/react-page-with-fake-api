import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const PostForm = ({ onFinish, submitText, initialValues, method}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	console.log(initialValues)


    //copy id's from initialValues on update 
	const workEnder = (values) => {
            // console.log(values)
            onFinish({...values, id:initialValues.id})        
	}

	return (
		<Form form={form} layout='vertical' onFinish={method ==="update" ? workEnder : onFinish} initialValues={initialValues}>
			<Form.Item name='title'>
				<Input placeholder='Post title' />
			</Form.Item>
			<Form.Item name='body'>
				<Input placeholder='Post content' />
			</Form.Item>
			<Form.Item className='text-center'>
				<Button className='w-100' htmlType='submit' size='large' type='primary'>
					{submitText}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default PostForm;
