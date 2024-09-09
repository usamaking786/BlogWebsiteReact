import React from 'react'
import { Link } from 'react-router-dom'
import postServices from '../appwrite/PostData.js'

function PostCard({$id,title,content, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={postServices.getFilePreview(featuredImage)} alt={title} />
        <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{content}</p>

        </div>
    </div>
    </Link>
  )
}

export default PostCard