import { useState, useEffect } from "react"
import { deleteLike, getAllUserLikes, getallPosts } from "../../services/postServices"
import { Link } from "react-router-dom"


export const FavoritePosts = ({currentUser}) => {

    const [posts, setPosts] = useState([])
    
    const [myLikes, setMyLikes] = useState([])

    useEffect(() => {
        getallPosts().then(() => {
            setPosts(posts)

        })
    }, [])

    useEffect(() => {

        getAllUserLikes().then((likes) => {


            const userLikes = likes.filter((like) => currentUser.id === like.userId)
            setMyLikes(userLikes)
    
        })
       
    }, [currentUser.id])


    const handleDelete = (likeObj) => {
        deleteLike(likeObj).then(res => res.json())
        .then(() => {
            const updatedMyLikes = myLikes.filter((like) => like.id !== likeObj.id) //includes all posts from favorites except the one that matches the likeObj.id that was deleted
            setMyLikes(updatedMyLikes)
        })
        
    }
    
    
    return (
        
            <div className="post-container" >
                {myLikes.map((likeObj) => {
                    console.log(likeObj.id)
                    return (
                        <div className="posts" like={likeObj} key={likeObj.id}><div>

                            <Link to={`/allposts/${likeObj.id}`}> <div className="post-info post-title">{likeObj.post?.title}</div>
                            </Link>
                        </div>
                        <div className="btn-container">
                                {currentUser.id === likeObj.userId ? (<button
                                    className="btn btn-primary"
                                    onClick={() => handleDelete(likeObj)}
                                    
                                >Remove Like</button>) : ""
                                }
                            </div>
                        </div>

                    )
                })}
            </div>
        
    )       
}