import { useEffect, useState } from "react"
import { getallPosts, getAllTopics, getAllUserLikes } from "../../services/postServices"
import "./Posts.css"


export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("")
    
    
    useEffect(() => {
        getallPosts().then((postsArray) => {
            setAllPosts(postsArray)
            setFilteredPosts(postsArray)
        })
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
            console.log(foundPosts)
            setFilteredPosts(foundPosts)
        } else {
            //if no topic is selected, show all posts.
            setFilteredPosts(allPosts)
        }

    }, [selectedTopic, allPosts])
    
    
    
    return (
        <div className="post-hdr">
            <div>
                <h1 className="post-h1">All Posts</h1>
            </div>
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
                        // console.log(selectedTopic)
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
            <div className="post-container">
                {filteredPosts.length > 0 ? filteredPosts.map((post) => {
                    console.log(post)
                    //count the number of likes for each post
                    const postLikeCount = allLikes.filter((like) => like.postId === post.id)
                    
                    return (
                        <div key={post.id} className="posts">
                            <div className="post-hdr">
                                <div className="post-info post-title">{post.title}</div>
                            </div>
                            <div className="post-info post-body">{post.body}</div>
                            <div className="post-info">{postLikeCount.length} likes</div>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}