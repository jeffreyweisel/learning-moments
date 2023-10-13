import { useEffect, useState } from "react"
import { addUserLike, getallPosts, getAllTopics, getAllUserLikes } from "../../services/postServices"
import "./Posts.css"
import { Link, useNavigate } from "react-router-dom"



export const PostList = ({ currentUser }) => {
    
    const navigate = useNavigate()
    
    const [allPosts, setAllPosts] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("")





    const getData = () => {
        getallPosts().then((postsArray) => {
            setAllPosts(postsArray)
            setFilteredPosts(postsArray)
        })
    }
    useEffect(() => {
        getData()

    }, [])

    // useEffect for post likes
    useEffect(() => {
        getAllUserLikes().then((likesArray) => {
            setAllLikes(likesArray)
        })

    }, [])

    // useEffect for search bar
    useEffect(() => {
        if (searchTerm.length > 0) {
            const foundPosts = allPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredPosts(foundPosts)
        }

    }, [searchTerm, allPosts])


    useEffect(() => {
        // Fetch all topics
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })

    }, [])

    // useEffect for filtering posts based on the selected topic.
    useEffect(() => {
        if (selectedTopic) {
            const foundPosts = allPosts.filter((post) => post.topicId == selectedTopic)
            // console.log(foundPosts)
            setFilteredPosts(foundPosts)
        } else {
            //if no topic is selected, show all posts.
            setFilteredPosts(allPosts)
        }

    }, [selectedTopic, allPosts])




    const handleLike = (postObj) => {

        const postInfo = {
            userId: currentUser.id,
            postId: postObj.id
        }

        addUserLike(postInfo).then(() => {
            navigate(`/favorites`)
        })
        


    }


    return (
        <div className="post-hdr">
            <div className="filter-bar">
                {/* the search bar  */}
                <div className="post-search">
                    <input
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }}
                        type="text"
                        placeholder="Search Posts"
                        className="post-input"
                    />
                </div>
                {/* the dropdown selector */}
                <div className="post-search">
                    <select
                        onChange={(event) => {
                            setSelectedTopic(event.target.value)

                        }}
                        value={selectedTopic}
                        className="post-select"
                    >
                        <option value="">Select a topic</option>
                        {allTopics.map((topic) => (
                            <option key={topic.id}
                                value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="post-container" >
                {filteredPosts.map((postObj) => {
                    console.log(postObj.id)
                    //count the number of likes for each post
                    const postLikeCount = allLikes.filter((like) => like.postId === postObj.id)
                   

                    return (
                        <div className="posts" post={postObj} key={postObj.id}><div>

                            <Link to={`/allposts/${postObj.id}`}> <div className="post-info post-title">{postObj.title}</div>
                            </Link>
                        </div>
                            <div className="post-info post-body">{postObj.body}</div>
                            <div className="post-info">{postLikeCount.length} likes</div>
                            <div className="btn-container">
                                {currentUser.id !== postObj.userId  ? (<button
                                    className="btn btn-secondary"
                                    onClick={() => handleLike(postObj)}
                                >Like</button>) : ""
                                }
                                {currentUser.id === postObj.userId ? (<button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        navigate("/allposts/edit/"+ postObj.id, {postObj})
                                    }}
                                >Edit</button>) : ""
                                }
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}







