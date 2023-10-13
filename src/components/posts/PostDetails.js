import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Posts.css"
import { getPostById } from "../../services/postServices"

export const PostDetails = () => {

    const [post, setPost] = useState({})

    const { postId } = useParams()

    useEffect(() => {
        getPostById(postId).then((data) => {
            const postObj = data[0]
            setPost(postObj)
        })
    }, [postId])

    return <div className="posts">
        <header className="posts-info post-body post-header"> {post.user?.name}</header>
        <div className="posts-info post-body">
            <span> Title: </span>
            {post.title}
        </div>
        <div className="posts-info post-body">
            <span> Body: </span>
            {post.body}
        </div>
        <div className="posts-info post-body">
            <span> Date: </span>
            {post.date}
        </div>
        <footer className="posts-info post-body post-footer">

             {post.userLikes?.length} likes
        </footer>
        
    </div>
}