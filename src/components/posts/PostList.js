import { useEffect, useState } from "react"
import { getallPosts } from "../../services/postServices"
import "./Posts.css"

export const PostList = () => {

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getallPosts().then(postsArray => {
            setAllPosts(postsArray)
            console.log("tickets set!")
        })

    }, [])
     
    
    return (

        
            allPosts.map((post) => {
                return (
                    <div className="posts">
                        <div className="post-info">{post.id}</div>
                        <div className="post-info"> Author: {post.user.name}</div>
                        <div className="post-info">Title: {post.title}</div>
                        <div className="post-info">{post.body}</div>
                    </div>
                )
            })
        
        
    )
}