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

    return <section className="post">
        <header className="post-header"> {post.user?.name}</header>
        <div>
            <span className="posts-info"> Title: </span>
            {post.title}
        </div>
        <div>
            <span className="posts-info"> Body: </span>
            {post.body}
        </div>
        <div>
            <span className="posts-info"> Date: </span>
            {post.date}
        </div>
        <footer className="employee-footer">

             {post.userLikes?.length} likes
        </footer>
        
    </section>
}