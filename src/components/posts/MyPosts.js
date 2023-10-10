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


    const handleDelete = () => {
        console.log('working')
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
                                    onClick={handleDelete}
                                >Delete</button>) : ""
                                }
                            </div>
                        </div>

                    )
                })}
            </div>
        
    )       
  }                  
                            
                    

