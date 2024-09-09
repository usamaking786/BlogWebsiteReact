import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from "react-router-dom";
import postServices from '../appwrite/PostData';
import Container from '../components/container/Container';
import PostForm from '../components/postForm/PostForm';


function EditPost() {
    const {slug} = useParams();
    const [post, setPosts] = useState(null)
    // console.log(slug);

    useEffect(() => {
     postServices.getPost(slug).then((post) => {
        console.log(post)   
        setPosts(post)
     })
    }, [slug])
    
  return (
    <div className='py-8'>
        <Container>
    <PostForm post={{...post}} />
    </Container>
        </div>
  )
}

export default EditPost