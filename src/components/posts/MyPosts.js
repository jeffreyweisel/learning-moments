import { useEffect, useState } from "react"
import { deletePost, getallPosts } from "../../services/postServices"
import { Link } from "react-router-dom"
import "./Posts.css"


export const MyPosts = ( { currentUser}) => {

    const [posts, setPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        getallPosts().then((postsArray) => {
            setPosts(postsArray)

        })
    }, [])

    useEffect(() => {

        const userPosts = posts.filter((post) => currentUser.id === post.userId)
        setMyPosts(userPosts)

    }, [posts, currentUser.id])


    const handleDelete = (postObj) => {
        deletePost(postObj).then(res => res.json())
        .then(() => {
            const updatedMyPosts = myPosts.filter((post) => post.id !== postObj.id) //includes all posts from myPosts except the one that matches the postObj.id that was deleted
            setMyPosts(updatedMyPosts)
        })
        
    }
    
    
    return (
        
            <div className="post-container" >
                {myPosts.map((postObj) => {
                    console.log(postObj.id)
                    return (
                        <div className="posts" post={postObj} key={postObj.id}><div>

                            <Link to={`/allposts/${postObj.id}`}> <div className="post-info post-title">{postObj.title}</div>
                            </Link>
                        </div>
                        <div className="btn-container">
                                {currentUser.id === postObj.userId ? (<button
                                    className="btn btn-warning"
                                    onClick={() => handleDelete(postObj)}
                                    
                                >Delete</button>) : ""
                                }
                            </div>
                        </div>

                    )
                })}
            </div>
        
    )       
  }                  
                            
                    

