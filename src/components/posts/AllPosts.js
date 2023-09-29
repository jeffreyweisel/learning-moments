import { useEffect, useState } from "react"
import { getallPosts } from "../../services/postServices"
import "./Posts.css"
import { getAllUserLikes } from "../../services/postServices"

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        //fetch all posts
        getallPosts().then((postsArray) => {
            setAllPosts(postsArray)
        })

        //fetch all user likes
        getAllUserLikes().then((likesArray) => {

            //filter likes associated with posts
            const postLikes = likesArray.filter((like) =>
                //find the individual posts that has a matching id like in book 4 example
                allPosts.find((post) => post.id === like.postId)
            )
            setAllLikes(postLikes)
        })

    }, [allPosts, allLikes])


    useEffect(() => {
        const foundPosts = allPosts.filter((post) => post.body.toLowerCase().includes(searchTerm.toLowerCase()))
        setAllPosts(foundPosts)
    }, [searchTerm, allPosts])


    return (
        <div className="post-container">
            <input
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
                type="text"
                placeholder="Search Posts"
                className="post-search"
            />
            {allPosts.map((post) => {
                //count the number of likes for each post
                const postLikeCount = allLikes.filter((like) => like.postId === post.id)

                return (

                    <div key={post.id} className="posts">
                        <div className="post-hdr">
                            <div className="post-info post-title">{post.title}</div>
                        </div>
                        <div className="post-info post-title">{post.body}</div>
                        <div className="post-info">{postLikeCount.length} likes</div>
                    </div>
                )
            })}
        </div>
    )
}



